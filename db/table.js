//import { v4 as uuidv4 } from 'uuid';
const uuid = require('uuid')
const fs = require('fs');
var _ = require("lodash");

const { Client } = require('pg')
const client = new Client({
  host: 'localhost',
  port: 5432,
  database: 'mitra',
  user: 'mitra_admin',
  password: 'jaishreesitaram',
})
client.connect(err => {
  if (err) {
    console.error('connection error', err.stack)
  } else {
    console.log('connected')
  }
})
// let city_data = [];
// getCity = function () {
//   const data = fs.readFileSync('json/cities.json', (err, data) => {
//     if (err) throw err;
//     else {
//       city_data = JSON.parse(data).cities;

//       console.log(city_data);
//     }
//   })
// }
// getCity()
let cityPath = 'D:/Luvv/Mitra/db/updateJson/cities.txt'
let statePath = 'D:/Luvv/Mitra/db/updateJson/state.txt'
let cntPath = 'D:/Luvv/Mitra/db/updateJson/countries.txt'

const statedata = fs.readFileSync('json/states.json')
const citydata = fs.readFileSync('json/cities.json')
const city = function (state_id, int) {
  // const data = fs.readFileSync('json/cities.json')
  let city_data = JSON.parse(citydata).cities;
  var filtered = city_data.filter(o => o.state_id === int);
  // console.log(filtered);
  filtered.forEach(e => {
    console.log("city " + e.name);
    e.sys_id = uuid.v4()
    e.state_id = state_id;
  });
  var modifiy = JSON.stringify(filtered).replace(/\[|\]/g, '').length > 0 ? JSON.stringify(filtered).replace(/\[|\]/g, '') + ',\n' : '\n'
  // console.log(modifiy);
  fs.appendFileSync(cityPath, modifiy)
}

const state = function (cnt_id, int) {
  
  let state_data = JSON.parse(statedata).states ;
  var filtered = state_data.filter(o => o.country_id === int);
  // console.log(filtered);
  filtered.forEach(e => {
    console.log("state " + e.name);
    e.sys_id = uuid.v4()
    e.country_id = cnt_id;
    city(e.sys_id, e.id + '')
  });
  var modifiy = JSON.stringify(filtered).replace(/\[|\]/g, '').length > 0 ? JSON.stringify(filtered).replace(/\[|\]/g, '') + ',\n' : '\n'
  // console.log(modifiy);
  fs.appendFileSync(statePath, modifiy)

}

const country = function () {
  const data = fs.readFileSync('json/countries.json')
  let ctn_data = JSON.parse(data).countries;
  ctn_data.forEach(e => {
    console.log("country " + e.name);
    e.sys_id = uuid.v4()
    state(e.sys_id, e.id + '')
  });
  var modifiy = JSON.stringify(ctn_data).replace(/\[|\]/g, '') + ',\n'
  // console.log(modifiy);
  fs.appendFileSync(cntPath, modifiy)
}

/*
  client.query('SELECT NOW()', (err, res) => {
    if (err) throw err
    console.log(res)
    client.end()
  })
*/
// country();
console.log('completed'  + uuid.v4());