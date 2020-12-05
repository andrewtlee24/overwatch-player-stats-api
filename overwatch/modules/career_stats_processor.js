const cheerio = require('cheerio');
const stat_map = require('../utils/stat_map');
const convert = require('../utils/convert');

module.exports.process_career_stats = function(body, game_mode) {
    const $ = cheerio.load(body);

    const career_stats = {};

    $.root().find(`#${game_mode} > .career-section`).find('[data-group-id=stats]').each((stat_index, stat_element) => {
        const hero_id = stat_element.attribs['data-category-id'];
        
        if(hero_id == undefined) {
            return;
        }
        
        const hero = stat_map.career_stat_category_map[hero_id];

        var hero_stats = {};
        $(stat_element).find('table').each((stat_table_index, stat_table_element) => {
            const title = convert.convert_to_key($(stat_table_element).find('thead').text().trim());
            var stat_category = {};
            $(stat_table_element).find('tbody > .DataTable-tableRow').each((stat_row_index, stat_row_element) => {
                var key, value;
                $(stat_row_element).find('td').each((stat_col_index, stat_col_element) => {
                    if(stat_col_index == 0) {
                        key = convert.convert_to_key($(stat_col_element).text())
                    } else {
                        value = convert.convert_value_type($(stat_col_element).text())
                    }
                });
                stat_category[key] = value;
            })
            hero_stats[title] = stat_category;
        }) 
        career_stats[hero] = hero_stats;
    })
    return career_stats;
}