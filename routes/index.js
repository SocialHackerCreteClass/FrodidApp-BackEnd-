var connection = require('../connection/connection');
//import connection } from '../connection/connection';

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  
  connection.connect();

  connection.query('SELECT * FROM employee', function (error, results, fields) {
    if (error) throw error;
    res.send(results);
    console.log('The solution is: ');
  });
   
  connection.end();
});

router.get('/whatever', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.delete('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
