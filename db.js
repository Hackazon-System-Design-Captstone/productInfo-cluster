const pg = require('pg');

const client = new pg.Client({
  user: 'postgres',
  host: 'ec2-52-53-202-7.us-west-1.compute.amazonaws.com',
  database: 'product',
  password: '$password',
  port: '5432',
});

client.connect((err) => {
  if (err) {
    console.log('connection error', err);
  } else {
    console.log('database connected !');
  }
});

// =================== get from table ==========================
exports.getProduct = (id, cb) => {
  const query = `SELECT * from productInfo where id=${id}`;
  client.query(query, (err, res) => {
    if (err) {
      console.log('this is an error in db query', err);
    } else {
      console.log('getproduct in db.js working')
      cb(err, res.rows[0]);
    }
  });
};
// ====================== update table  ======================

exports.updateTable = (id, value, cb) => {
  client.query(`UPDATE productInfo SET sellerName = ? where id = ${id}`, value, cb);
};

// ====================== delete from table ====================
exports.deleteFromTable = (id, cb) => {
  client.query('delete from productInfo where id=?', id, cb);
};

// ====================== post to table =================

exports.addToTable = (data, cb) => {
  console.log(data.usedPrice);
  client.query(
    `INSERT INTO productinfo (id, productName, sellerName, ratingsAverage, ratingsCount, questionsCount,
     amazonsChoice, categoryName, priceList, price, freeReturns, freeShipping, soldByName, available, hasCountDown,
      description, usedCount, usedPrice, imageUrl, varKey, varValue) VALUES ( 
    ${data.id}, '${data.productName}', '${data.sellerName}', ${data.ratingsAverage}, ${data.ratingsCount}, ${data.questionsCount},
    ${data.amazonsChoice}, '${data.categoryName}', ${data.priceList}, ${data.price}, ${data.freeReturns},
    ${data.freeShipping}, '${data.soldByName}', ${data.available}, ${data.hasCountDown}, '${data.description}', ${data.usedCount}
    ${data.usedPrice}, '${data.imageUrl}', '${data.varKey}', '${data.varValue}')`, (err, res) => {
      console.log(err);
      cb(err, null);
    });
};