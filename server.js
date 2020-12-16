const next = require('next');
const express = require('express');
const passport = require('passport');
const cors = require('cors');
const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({dev});
const handle = nextApp.getRequestHandler();
const session = require('express-session') 

// Setup environment variables
require('dotenv').config();

nextApp.prepare().then(() => {
    const app = express();

    // Express middleware
    app.use(cors());
    app.use(express.json());
    app.use(passport.initialize());

    // Passport strategies
    require('./strategies/jwt')(passport);

    // Session Configuration
    app.use(session({ 
        // holds the secret key for each session 
        secret: 'Your_Secret_Key', 
        resave: true, 
        // Forces a session that is "uninitialized" 
        // to be saved to the store 
        saveUninitialized: true
    }));

    // Custom routes
    app.use('/api/users', require('./routes/api/users'));
    app.use('/api/maintain', require('./routes/api/maintain'));
    app.use('/api/chat', require('./routes/api/chat'));
    app.use('/api/messages', require('./routes/api/messages'));

    app.get('*', (req, res) => {
        return handle(req, res);
    });

    app.listen(port, err => {
        if (err) {
            throw err;
        }

        console.log(`> Ready on http://localhost:${port}`);
    })
}).catch(ex => {
    console.error(ex.stack);
    process.exit(1);
})
