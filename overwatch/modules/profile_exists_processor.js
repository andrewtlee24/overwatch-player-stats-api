const cheerio = require('cheerio')

module.exports.profile_exists = function (html) {
    const $ = cheerio.load(html)
    const h1 = $('h1').text();
    if(h1.trim() == 'Profile Not Found') {
        return false
    }
    return true
}