const express = require('express');
const router = express.Router();
const twilio = require('twilio');
const chance = require('chance');

const AccessToken = twilio.jwt.AccessToken;
const ChatGrant = AccessToken.ChatGrant;
const Chance = new chance();


router.get('/token', (req, res) => {
    const token = new AccessToken(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_API_KEY,
        process.env.TWILIO_API_SECRET,
        process.env.TWILIO_CHAT_SERVICE_SID,
        
    );

    token.identity = Chance.name();
    token.addGrant(new ChatGrant({
        serviceSid: process.env.TWILIO_CHAT_SERVICE_SID
    }));

    return res.send({identity: token.identity, jwt: token.toJwt()});
});

module.exports = router;