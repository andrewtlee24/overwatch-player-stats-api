const express = require('express')
const app = express()
const ow = require('./overwatch/overwatch');

const supported_platforms = ['pc', 'psn', 'xbl', 'nintendo-switch']

const port = process.env.PORT || 3000

app.get('/', async (req, res) => {
    res.status(200).send("USAGE: https://overwatch-player-api.herokuapp.com/platform/battletag")
})

app.get('/:platform/:battletag', async (req, res) => {
    try {
        const platform = req.params.platform;
        const battletag = req.params.battletag;

        if(!valid_platform(platform)) {
            const error = get_error("INVALID_PLATFORM", "The platform provided is invalid")
            res.status(400).send({error:error})
            return
        }

        const data = await ow.get_player_info(platform, battletag)
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send("Internal server error");
    }
})

app.listen(port, () => {

})

function valid_platform(platform) {
    return supported_platforms.includes(platform)
}

function get_error(type, message) {
    return {
        type:type,
        message:message
    }
}