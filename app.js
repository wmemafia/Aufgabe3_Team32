// DO NOT CHANGE!
//init app with express, util, body-parser, csv2json
var express = require('express');
var app = express();
var sys = require('util');
var path = require('path');
var bodyParser = require('body-parser');
var Converter = require("csvtojson").Converter;

//register body-parser to handle json from res / req
app.use(bodyParser.json());

//register public dir to serve static files (html, css, js)
app.use(express.static(path.join(__dirname, "public")));

// END DO NOT CHANGE!

function nocache(req, res, next) {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next();
}


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
 * get all countries with properties
 */
app.get('/items', nocache, function(req, res) {
    res.send(data);
});

/**
 * get country with given id and properties
 */
app.get('/items/:id', nocache, function(req, res) {
    var id = req.params.id;
    var country = data.find(function(element) {
        return element.id == id;
    });
    if (country !== undefined) {
        res.send(country);
    } else {
        res.status(404).send('No such id {' + id + '} in database.');
    }
});

/**
 * get countries in defined range with properties
 */
app.get('/items/:id1/:id2', nocache, function(req, res) {
    var id1 = +req.params.id1 <= +req.params.id2 ? +req.params.id1 : +req.params.id2;
    var id2 = +req.params.id1 >= +req.params.id2 ? +req.params.id1 : +req.params.id2;
    var result = [];
    for (i = id1; i <= id2; i++) {
        if (country = data.find(function(element) {
                return element.id == i;
            })) {
            result.push(country);
        }
    }
    if (result.length == 0) {
        res.status(400).send('Range not possible.');
    } else {
        res.send(result);
    }
});

/**
 * returns all the properties of a data object
 */
app.get('/properties', nocache, function(req, res) {
    if (data.length > 0) {
        res.send(Object.keys(data[0]));
    } else {
        res.send('No data available');
    }
});

/**
 * returns the property with the given number if exists
 */
app.get('/properties/:num', nocache, function(req, res) {
    var num = req.params.num;
    if (data.length > 0) {
        // #TODO: check if num in bounds of array (NaN ??)
        var keys = Object.keys(data[0]);
        if (keys[num] !== undefined) {
            res.send(keys[num]);
        } else {
            res.send('No such property available.');
        }

    } else {
        res.send('No data available');
    }
});

/**
 * POST-Methods
 */


app.post('/items', function(req, res) {
    var name = req.body.country_name;
    var birth = req.body.country_birth;
    var cellphone = req.body.country_cellphone;
    // maybe we should validate the input more
    // #TODO: we could adjust the json to fit in the original pattern
    data.push(req.body);
    res.send('Added country ' + name + ' to list!');
});


/**
 * DELETE-Methods
 */

/**
 * deletes the last country
 */
app.delete('/items', function(req, res) {
    if (data.length > 0) {
        var popped = data.pop();
        res.send('Deleted last country: ' + popped.name);
    } else {
        res.send('No data available.');
    }
});

/**
 * deletes the country with the given id
 */
app.delete('/items/:id', function(req, res) {
    var id = req.params.id;
    var index = data.findIndex(function(element) {
        return element.id == id;
    });

    if (index >= 0) {
        data.splice(index, 1);
        res.send('Item {' + id + '} deleted successfully.');
    } else {
        res.status(404).send('No such id {' + id + '} in database');
    }
});



// DO NOT CHANGE!
// bind server to port
var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});