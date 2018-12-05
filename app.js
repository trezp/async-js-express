const express = require('express');
const app = express();

const fs = require('fs');

function getData(cb){
  return fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) throw err;
    return cb(data);
  });
}

app.get('/', (req, res) => {
  getData((data) => {
    res.send(data);
  });
});

app.listen(3000, () => console.log('App listening on port 3000!'));