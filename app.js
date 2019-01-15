const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

app.set('view engine', 'pug');
app.set("views", path.join(__dirname, "views"));
app.use(express.static('public'))

function asyncHandler(cb){
  return async(req, res, next) => {
    try {
      await cb(req, res, next)
    } catch(err){
      res.render('error', {error: err});
    }
  }
}
// CALL BACKS
// function getUsers(cb){
//   fs.readFile('data.json', 'utf8', (err, data) => {
//     if (err) return cb(err);
//     const users = JSON.parse(data);
//     return cb(null, users);
//   });
// }

// app.get('/', (req, res) => {
//   getUsers((err, data) => {
//     if(err){
//       res.render('error', {error: err});
//     } else {
//       res.render('index', {title: "Users", users: data.users});
//     }
//   });
// });

// PROMISES
function getUsers(cb){
  return new Promise((resolve, reject) => {
    fs.readFile('data.json', 'utf8', (err, data) => {
      if(err) {
        reject(err);
      } else {
        const users = JSON.parse(data);
        resolve(users);
      }
    });
  });
}

//PROMISES
// app.get('/', (req, res) => {
//   getUsers()
//     .then((users) => {
//       res.render('index', {title: "Users", users: users.users});
//     })
//     .catch((err) => {
//       res.render('error', {error: err});
//     });
// });

app.get('/', asyncHandler(async (req, res) => {
  throw new Error("It broke")
  const users = await getUsers();
  res.render('index', {title: "Users", users: users.users});
}));


app.listen(3000, () => console.log('App listening on port 3000!'));