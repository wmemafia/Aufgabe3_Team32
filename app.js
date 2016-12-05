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


/**
* get all countries wirh properties
*/
app.get('/items', function(req, res) {
    res.send(JSON.stringify(data, null, 4));
});

/**
* get country with given id and properties
*/
app.get('/items/:id', function(req, res) {
    var id = req.params.id;
    var country = data.find(function(element) {
        return element.id == id;
    });
    if( country !== undefined) {
        res.send(JSON.stringify(country, null, 4));
    } else {
        res.status(404).send('No such id {' + id + '} in database.');
    } 
});

/**
* get countries in defined range with properties
*/
app.get('/items/:id1/:id2', function(req, res) {
    var id1 = req.params.id1 <= req.params.id2 ? req.params.id1 : req.params.id2;
    var id2 = req.params.id1 >= req.params.id2 ? req.params.id1 : req.params.id2;
    var result = [];
    for (i = id1; i <= id2; i++){
        if(country = data.find(function(element) {
            return element.id == i;
        })) {
            result.push(country);
        }
    }
    if (result.length == 0) {
        res.status(400).send('Range not possible.');
    } else {
        res.send(JSON.stringify(result, null, 4));
    }
});

/**
* returns all the properties of a data object
*/
app.get('/properties', function(req, res) {
    if(data.length > 0) {
        res.send(JSON.stringify(Object.keys(data[0])));
    } else {
        res.send('No data available');
    }
});

app.get('/properties/:num', function(req, res) {
    var num = req.params.num;
    if(data.length > 0) {
        // #TODO: check if num in bounds of array (NaN ??)
        var keys = Object.keys(data[0]);
        res.send(keys[num]);
    } else {
        res.send('No data available');
    }
})


/**
* DELETE-Methods
*/
app.delete('/items/:id', function(req, res) {
    var id = req.params.id;
    var index = data.findIndex(function(element) {
        return element.id == id;
    });
    
    if(index >= 0) {
        data.splice(index, 1);
        res.send('Item {' + id + '} deleted successfully.');
    } else {
        res.status(404).send('No such id {' + id + '} in database');
    }
    
});


// DO NOT CHANGE!
// bind server to port
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});