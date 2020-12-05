const cheerio = require('cheerio');
const { debug } = require('request');
const convert = require('../utils/convert');

module.exports.process_account_info = function(page_body, battletag, platform) {
    const $ = cheerio.load(page_body);

    const permission_text = $('.masthead-permission-level-text').text();
    const is_public = is_public_profile(permission_text)
    const portrait = $('.player-portrait').attr("src");

    const level_text = $('.player-level').first().text();
    const level_frame = $('.player-level').attr('style');
    const level_rank = $('.player-level > .player-rank').attr('style');
    
    const endorsement_text = $('.EndorsementIcon-tooltip > .u-center').first().text();
    const endorsement_frame = $('.EndorsementIcon').attr('style');

    const level = {
        level:convert.convert_value_type(level_text),
        frame_img:process_style_url(level_frame),
        rank_img:process_style_url(level_rank)
    }

    const endorsement = {
        level : convert.convert_value_type(endorsement_text),
        frame : process_style_url(endorsement_frame)
    }

    var competitive_ranks = {}
    $.root().find('.competitive-rank-role').each((index, element) => {
        const category = $(element).find('.competitive-rank-tier').attr('data-ow-tooltip-text');
        const value = $(element).find('.competitive-rank-level').text().trim();

        if(category.length == 0) {
            return
        }

        const key = convert.convert_to_key(category)
        const val = convert.convert_value_type(value)

        competitive_ranks[key] = val
    });

    return {
        public_profile:is_public,
        battletag:battletag,
        portrait:portrait,
        platform:platform,
        level:level,
        endorsement: endorsement,
        competitive_ranks: competitive_ranks
    }
}

function is_public_profile(permission_text) {
    return permission_text === 'Public Profile'
}

function process_style_url(url) {
    if(url == undefined) {
        return ''
    }
    return url.replace('background-image:url(', '').replace(')', '').trim()
}