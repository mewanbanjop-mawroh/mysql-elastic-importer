# Mysql-Elastic-Importer

## Setup

1. Clone the repository  ``` git clone https://github.com/mewanbanjop-mawroh/mysql-elastic-importer.git ```
2. Run ``` npm install ```
3. Change your configurations in the config.js file  
4. Start the bulk import using ``` npm start ```

## Example Config

```javascript
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
```

