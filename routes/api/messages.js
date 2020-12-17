const express = require('express');
const router = express.Router();
const passport = require('passport');
const { db } = require('../../database');

router.post('/getConversations', passport.authenticate('jwt', {session: false}), async (req, res) => {
    db.query('select * from conversations where client=? or professional=?', [req.user.id, req.user.id], (err, rows, fields) => {
        var conversations = [];

        rows.forEach(row => {
            db.query('select * from messages where conversation=?', row.id, (err, rows2, fields) => {
                row.messages = rows2;

                db.query('select * from users where id=?', row.client, (err, rows2, fields) => {
                    row.client = rows2[0];

                    db.query('select * from users where id=?', row.professional, (err, rows2, fields) => {
                        row.professional = rows2[0];
                        conversations = [
                            ...conversations,
                            row
                        ];

                        return res.json({conversations});
                    });
                });
            });
        });
    });
});

router.post('/startConversation', passport.authenticate('jwt', {session: false}), async (req, res) => {
    db.query('insert into conversations (client, professional) values (?, ?)', [req.user.id, req.body.user], (err, rows, fields) => {
        db.query('select * from conversations where id=?', rows.insertId, (err, results, fields) => {
            if (results.length <= 0) {
                return res.json({});
            }

            return res.json({conversation: results[0]});
        })
    });
});

router.post('/', passport.authenticate('jwt', {session: false}), async (req, res) => {
    db.query('insert into messages (conversation, sender, recipient, message) values (?, ?, ?, ?)', [req.body.conversation, req.body.from, req.body.to, req.body.message], (err, result, fields) => {
        db.query('select * from messages where id=?', result.insertId, (err, rows, fields) => {
            if (rows.length <= 0) {
                return res.json({});
            }

            return res.json({message: results[0]});
        });
    });
});

module.exports = router;