var express = require('express');
var router = express.Router();

// Mongoose import
var mongoose = require('mongoose');

// Mongoose connection to MongoDB
mongoose.connect('mongodb://localhost:27017/leaflet_map', function (error) {
    if (error) {
        console.log(error);
    }
});

// Mongoose Schema definition
var Schema = mongoose.Schema;
var JsonSchema = new Schema({
    name: String,
    type: Schema.Types.Mixed
});

// Mongoose Model definition

var Json = mongoose.model('JString', JsonSchema, 'leaflet_map');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/* GET json data. */
router.get('/mapjson/:name', function (req, res) {
    if (req.params.name) {
        Json.findOne({ name: req.params.name },{'_id': 0}, function (err, docs) {
            res.json(docs);
        });
    }
});

/* GET layers json data. */
router.get('/maplayers', function (req, res) {
    Json.find({},{'_id': 0, 'name': 1}, function (err, docs) {
        res.json(docs);
    });
});
 
/* GET Map page. */
router.get('/map', function(req,res) {
    var db = req.db;
    Json.find({},{'_id':0}, function(err,docs){
        res.render('map', {
            "jmap" : docs,
            lat : 40.78854,
            lng : -73.96374
        });
    });
});

module.exports = router;
