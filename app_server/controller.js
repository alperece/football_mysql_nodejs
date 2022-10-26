var mysql = require('mysql');
var express = require('express');
var session = require('express-session');

var path = require('path');

var app = express();

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'alper',
	password : '654321',
	database : 'lastfb'
});


app.use(session({
	secret: 'secret', // unique ID as a string
    resave: false, // to store idle (unused) sessions after some time and update it.
    saveUninitialized: false //  the session cookie will be set on the browser when the session is modified. 
    
    // If I remove the resave and saveUninitialized config options, I get warnings to say these options are deprecated and to provide values. 
   // The docs suggest setting these config options to false in most cases
}));



module.exports.football = function (req, res) {
    res.sendFile(path.join(__dirname, '../view/football.html'))
}
module.exports.home = function (req, res) {
    res.sendFile(path.join(__dirname, '../view/home.html'))
}
module.exports.welcome = function (req, res) {
    res.sendFile(path.join(__dirname, '../view/welcome.html'))
}

module.exports.postFootball = function(request, response) {

	// body-parser will parse the username and password from form
	console.log(request.body);
	var myteamname = request.body.team;
	
	if (myteamname) {

        // ! connection: Defined database connection informations's variable!
		connection.query('SELECT * FROM teamname WHERE team = ?', [myteamname], function(error, results, fields) {

            //console.log(results); // match id, username, password, email data in DB
            //console.log(fields); // field data for each column for id, username, password, email in DB
            console.log(results.length); // we have one match username and password. That's why, results.length is 1. Bigger than 0

			if (results.length > 0) {

				request.session.loggedin = true;
                request.session.newmyteamname = myteamname;
            
                response.redirect('/welcome');
             
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	}
}