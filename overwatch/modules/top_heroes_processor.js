const stat_map = require('../utils/stat_map');
const data_model = require('../utils/data_model');
const convert = require('../utils/convert');
const cheerio = require('cheerio');

module.exports.process_top_hero_stat_categories = function(body, game_mode) {
    const $ = cheerio.load(body);
    var data = {}
    $.root().find(`#${game_mode} > .career-section`).find('.progress-category').each((category_index, category_element) => {
        const category_id = category_element.attribs['data-category-id'];
        const category = stat_map.hero_comparison[category_id];
        
        var category_data = {}
        $(category_element).find('.ProgressBar').each((hero_index, hero_element) => {
            const name = $(hero_element).find('.ProgressBar-title').text();
            const key = data_model.hero_key_map[name];
            const desc = $(hero_element).find('.ProgressBar-description').text();
            category_data[key] = convert.convert_value_type(desc);
        })
        data[category] = category_data;
    })
    return data;
}