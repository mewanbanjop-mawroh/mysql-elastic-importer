var config = {
  /**
   * Database configuration
   */
  dbConfig: {
    connectionPool: 100, //configure number of connections
    host: 'your_mysql_ip/hostname', //mysql hostname 
    user: 'your_mysql_username',
    password: 'your_mysql_password',
    database: 'your_database',
  },
  tablename: 'your_mysql_tablename',
  maxRows: 100000, //maxRows to read from Mysql at a time default is 100000

  /**
   * Elastic search configuration
   */
  elasticConfic: {
    host: 'localhost:9200',//elastic search host
    log: 'trace'
  },
  index: 'your_elastic_indexname',
  type: 'your_elastic_type',

};

module.exports = config;

/*
Example Config:
*/

/*
var config = {
  
  dbConfig: {
    connectionPool: 100,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test',
  },
  tablename: 'products',
  maxRows: 100000,

  
  elasticConfic: {
    host: 'localhost:9200',
    log: 'trace'
  },
  index: 'products',
  type: 'product',

};
*/