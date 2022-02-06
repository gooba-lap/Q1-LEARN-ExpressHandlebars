require('./models/db');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const expressHandlebars = require('express-handlebars');

const taskController = require('./controller/taskController');

var app = express();

app.use(bodyParser.urlencoded({
    extended : true
}));

app.use(bodyParser.json());

app.set('views', path.join(__dirname, '/views/'))

// TypeError: expressHandlebars is not a function => expressHandlebars => expressHandlebars.engine
app.engine('hbs', expressHandlebars.engine({
    extname : 'hbs',
    defaultLayout : 'mainLayout',
    layoutsDir : __dirname + '/views/'
}))

app.set('view engine', 'hbs');

app.listen(5000,() => {
    console.log("Server is listening on Port 5000");
})

app.use('/', taskController);