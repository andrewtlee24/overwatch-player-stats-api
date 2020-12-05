const profile_exists_processor = require('./modules/profile_exists_processor');
const account_processor = require('./modules/account_processor');
const top_heroes_processor = require('./modules/top_heroes_processor');
const career_stats_processor = require('./modules/career_stats_processor');
const achievements_processor = require('./modules/achievements_processor');
const request = require('request');

module.exports.get_player_info = async function(platform, battletag) {
    const url = `https://playoverwatch.com/en-us/career/${platform}/${battletag}/`;

    const page_body = await get_page_source(url);

    // Ensure that the profile exists
    const exists = profile_exists_processor.profile_exists(page_body);
    if(!exists) {
        return {
            error: {
                type:'PROFILE_NOT_FOUND',
                message:'The profile does not exist'
            }
        }
    }

    // Process individual components of the player profile
    const account = account_processor.process_account_info(page_body, battletag, platform)
    const achievements = achievements_processor.process_achievements(page_body);
    const stat_categories_quickplay = top_heroes_processor.process_top_hero_stat_categories(page_body, 'quickplay');
    const stat_categories_competitive = top_heroes_processor.process_top_hero_stat_categories(page_body, 'competitive');
    const career_competitive = career_stats_processor.process_career_stats(page_body, 'competitive');
    const career_quickplay = career_stats_processor.process_career_stats(page_body, 'quickplay');

    const data = {
        error:null,
        account: account,
        quickplay: {
            top_heroes:stat_categories_quickplay,
            career:career_quickplay
        },
        competitive: {
            top_herioes:stat_categories_competitive,
            career:career_competitive
        },
        achievements:achievements
    }

    return data;
}

async function get_page_source(url) {
    return new Promise((resolve, reject) => {
        request(url, null, (error, response, body) => {
            if(error != undefined) {
                reject(error)
                return
            }
            resolve(body)
        })
    })
}