
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');

var myRouter = require('./app_server/router')

var app = express();

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.use(session({
	secret: 'secret', // unique ID as a string
  resave: false, // to store idle (unused) sessions after some time and update it.
    saveUninitialized: false //  the session cookie will be set on the browser when the session is modified. 
    
    // If I remove the resave and saveUninitialized config options, I get warnings to say these options are deprecated and to provide values. 
   // The docs suggest setting these config options to false in most cases
}));

app.get('/', myRouter);

app.get('/football', myRouter);

app.get('/welcome', myRouter);

app.post('/auth', myRouter);


app.listen(8888);