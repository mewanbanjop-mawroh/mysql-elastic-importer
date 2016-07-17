/* 
Get the required modules
*/
var elasticsearch = require('elasticsearch');
var Promise = require('promise');
var util = require('./util/commonutil');
var db = require('./util/db');
var config = require('./config');
var client = new elasticsearch.Client(config.elasticConfig);

/*
Variable Definitions
*/
var sql = 'Select * from ' + config.tablename + ' LIMIT ? OFFSET ?';
var limit = config.maxRows,
    offset = 0,
    rowCount = 0,
    totalNumberOfRows = 0,
    batchCount = 0;

/*
1. Get row count of table 
*/
db.count()
/*
2. Perform BulkInsert of rows  
*/
.then(function(count) {
    console.log('Total number of rows:'+count);
    totalNumberOfRows = count;
    bulkInsert(limit, offset);
});

/*
Function to perform Bulk Insert
*/

function bulkInsert(limit, offset) {
    var values = [limit, offset];
    db.query(sql, values)
    .then(function(rows) {
        if (util.isEmpty(rows)) {
            console.log('Sorry Nothing Returned from table. CTRL+C to exit!');
        } 
        else {
            console.log('Batch Bulk Insert : ' + batchCount);
            var productIndices = mapToElasticIndexData(rows);
            client.bulk({
                body: productIndices,
                refresh: true
            }, function(err, resp) {
                console.log(resp);
                console.log('Batch Bulk Insert Complete :' + batchCount);
                batchCount++;
                if (rowCount <= limit*2) {
                    offset += limit;
                    bulkInsert(limit, offset);
                } else {
                    console.log('Bulk Insert complete. CTRL+C to exit!');
                }
            });
        }
    }).catch(function(err) {
        console.log(err);
    });
}

// function to map rows to document index for bulk insert 
function mapToElasticIndexData(rows) {
    var products = [];
    rows.forEach(function(row) {
        var index = {
            index: {
                _index: config.index,
                _type: config.type,
                _id: ++rowCount
            }
        };
        products.push(index);
        products.push(row);
    });
    return products;
}

// http://127.0.0.1:9200/products/_search/?size=1000&pretty=1