
require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('./db.js');



app.use(bodyParser.urlencoded({
  extended: true,
}));


// get route ================

app.get('/get', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  db.getProduct(req.query.id, (err, data) => {
  if (err) {
    res.status(503).send(err);
  } else {
    res.header('Access-Control-Allow-Origin', '*');
    const {
    id, productname, sellername, ratingsaverage, ratingscount, questionscount, amazonschoice, categoryname, pricelist, price, freereturns, freeshipping, soldbyname, available, hascountdown, description, usedcount, usedprice, imageurl, varkey, varvalue,
    } = data;
    const camelCasedData = {
    productName: productname,
    sellerName: sellername,
    ratingsAverage: ratingsaverage,
    ratingsCount: ratingscount,
    questionsCount: questionscount,
    amazongsChoice: amazonschoice,
    categoryName: categoryname,
    priceList: pricelist,
    price,
    freeReturns: freereturns,
    freeShipping: freeshipping,
    soldByName: soldbyname,
    available,
    hasCountdown: hascountdown,
    description,
    usedCount: usedcount,
    usedPrice: usedprice,
    id,
    varKey: varkey,
    varValue: varvalue,
    imageUrl: imageurl,
    };
    res.send(camelCasedData);
  }
  });
});

// post route ================

app.post('/productinfo', bodyParser.json(), (req, res) => {
  db.addToTable(req.body, (err, data) => {
    if (err) { return console.error(err); }
    res.status(202).send();
  });
});


// put route =================

app.put('/productInfo/:id', bodyParser.json(), (req, res) => {
  db.updateTable(req.params.id, req.body, (err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send();
    }
  });
});

// delete route ==============

app.delete('/productInfo/:id', (req, res) => {
  db.deleteFromTable(req.params.id, (err) => {
    if (err) {
      res.status(503).send(err);
    } else {
      res.status(201).send();
    }
  });
  res.send('DELETE request received');
});

//= ==========================
// change this to whatever port number you choose in ec2 instance
app.listen(9003, () => {
  console.log('listening on 9003');
});
