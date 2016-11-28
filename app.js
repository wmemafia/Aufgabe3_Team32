// DO NOT CHANGE!
//init app with express, util, body-parser, csv2json
var express = require('express');
var app = express();
var sys = require('util');
var path = require('path');
var bodyParser = require('body-parser');
var Converter = require("csvtojson").Converter;

//register body-parser to handle json from res / req
app.use( bodyParser.json() );

//register public dir to serve static files (html, css, js)
app.use( express.static( path.join(__dirname, "public") ) );

// END DO NOT CHANGE!


/**************************************************************************
****************************** csv2json *********************************
**************************************************************************/

var data = [];

var converter = new Converter({});
converter.fromFile("./world_data.csv", function(err, result) {
    data = result;
});

/**************************************************************************
********************** handle HTTP METHODS ***********************
**************************************************************************/

/**
* GET-Methods
*/

app.get('/items', function(req, res) {
    res.send(JSON.stringify(data));
});


app.get('/items/:id', function(req, res) {
    var id = req.params.id;
    var country = data.find(function(element) {
        return element.id == id;
    })
    if( country !== undefined) {
        res.send(JSON.stringify(country));
    } else {
        res.status(404).send('No such id {' + id + '} in database!');
    } 
});


// DO NOT CHANGE!
// bind server to port
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});