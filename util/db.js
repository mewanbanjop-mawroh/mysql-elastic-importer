var mysql = require('mysql');
var config = require('./../config');
var util = require('./commonutil');
var pool = mysql.createPool(config.dbConfig);
var Promise = require('promise');

var db = {};

//Generic query using connection pool - that releases connection after query
db.query = function (sql, values) {
  return new Promise(function (fulfill, reject) {
    pool.getConnection(function (err, connection) {
      connection.query(sql, values, function (err, rows) {
        if (err) {
          connection.release();
          reject(err);
        }
        else {
          connection.release();
          fulfill(rows);
        }
      });
    });
  });
};

//Db function to get the total number of rows in  table
db.count = function () {
  return new Promise(function (fulfill, reject) {
    var sql = 'Select COUNT(*) as count from ' + config.tablename;
    db.query(sql, [])
      .then(function (rows) {
        if (util.isEmpty(rows)) {
          fulfill(0);
        } else {
          fulfill(rows[0].count);
        }
      })
      .catch(function (err) {
        console.log(err);
      })
  });
}

module.exports = db;