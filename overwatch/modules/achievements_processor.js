const cheerio = require('cheerio');
const convert = require('../utils/convert');

module.exports.process_achievements = function (page_body) {
    const $ = cheerio.load(page_body);

    const achievements_section = $('#achievements-section')

    const achievements = {}

    $(achievements_section).find('[data-group-id="achievements"]').each((index, element) => {
        const category = $(element).attr('data-category-id');
        if(category == undefined) {
            return;
        }

        const category_achievments = []

        $(element).find('.achievement-card-container').each((card_index, card_element) => {
            const title = $(card_element).find('.media-card-title').text().trim()
            const img = $(card_element).find('.media-card-fill').attr('src').trim();
            const description = $(card_element).find('.h6').text().trim();
            const locked = $(card_element).find('.achievement-card').hasClass('m-disabled')

            category_achievments.push( {title:title, description:description, img:img, unlocked:!locked} )
        })

        achievements[category] = category_achievments;
    })
    return achievements;
}