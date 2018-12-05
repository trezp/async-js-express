const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

app.set('view engine', 'pug');
app.set("views", path.join(__dirname, "views"));


function getUsers(cb){
  return fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) throw err;
    const users = JSON.parse(data);
    return cb(users);
  });
}

app.get('/', (req, res) => {
  getUsers((users) => {
    console.log(users)
    res.render('index', {title: "Profile Page", users: users.users});
  });
});

app.listen(3000, () => console.log('App listening on port 3000!'));