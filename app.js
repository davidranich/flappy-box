// required files

const express = require('express');
const path = require('path');
const app = express();

// port is either production port, or '8888' for dev server

const port = process.env.PORT || 8889;

// this is where the ejs files reside

app.set('views', path.join(__dirname, 'views'));

// Path to assets directory

app.use(express.static(path.join(__dirname, 'assets')));

// so we can use EJS

app.set('view engine', 'ejs');

// routes

require('./routes')(app);

app.listen(port);

console.log(`Listening for port: ${port}`);