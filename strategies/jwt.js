const jwtStrategy = require('passport-jwt').Strategy;
const extractJwt = require('passport-jwt').ExtractJwt;

const options = {
    jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
};

const { db } = require('../database');

module.exports = passport => {
    passport.use(new jwtStrategy(options, (jwt_payload, done) => {
        db.query('select * from users where id = ?', jwt_payload.id, (err, results, fields) => {
            if (err || results.length <= 0) {
                return done(null, false);
            }

            return done(null, JSON.parse(JSON.stringify(results[0])));
        });
    }));
}