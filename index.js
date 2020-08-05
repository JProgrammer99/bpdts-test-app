var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;
const api = require('./user');
app.listen(port);

// This will allow a query on the API/users/london/ and return the users who reside in London or last location brings them within 50 miles of London.
app.get('/users/london/', async (req, res) => {
  var json = await api.getUsersInOrNearLondon();
  return res.json(json);
});

console.log('BPDTS Test App RESTful API server started on: ' + port);
