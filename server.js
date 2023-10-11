const express = require('express');
const path = require('path');
const app = express();

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.use('/public', express.static(__dirname + '/public'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/src', express.static(path.join(__dirname, 'src')));

app.listen(5002, function () {
  console.log("servidor NODE corriendo en http://localhost:5002/");
});