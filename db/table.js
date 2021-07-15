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
  filtered.forEach(async (e) => {
    console.log("city " + e.name);
    e.sys_id = uuid.v4()
    e.state_id = state_id;
    const text = 'INSERT INTO cities(name,state_id,id) VALUES($1, $2, $3) RETURNING *'
    const values = [e.name, state_id, e.sys_id];
    try {
      const res = await client.query(text, values)
      console.log(res.rows[0])
      array.push(res.rows[0])
      // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
    } catch (err) {
      console.log(err.stack)
    }
  });
  console.log("cities completed");
  // var modifiy = JSON.stringify(filtered).replace(/\[|\]/g, '').length > 0 ? JSON.stringify(filtered).replace(/\[|\]/g, '') + ',\n' : '\n'
  // // console.log(modifiy);
  // fs.appendFileSync(cityPath, modifiy)
}

const state = function (cnt_id, int) {

  let state_data = JSON.parse(statedata).states;
  var filtered = state_data.filter( (o) => o.country_id === int);
  // console.log(filtered);
  filtered.forEach(async (e) => {
    console.log("state " + e.name);
    e.sys_id = uuid.v4()
    e.country_id = cnt_id;
    const text = 'INSERT INTO states(name,country_id,id) VALUES($1, $2, $3) RETURNING *'
    const values = [e.name, cnt_id, e.sys_id];
    try {
      const res = await client.query(text, values)
      console.log(res.rows[0])
      array.push(res.rows[0])
      // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
    } catch (err) {
      console.log(err.stack)
    }
    city(e.sys_id, e.id + '')
  });
  console.log("states completed");
  // var modifiy = JSON.stringify(filtered).replace(/\[|\]/g, '').length > 0 ? JSON.stringify(filtered).replace(/\[|\]/g, '') + ',\n' : '\n'
  // // console.log(modifiy);
  // fs.appendFileSync(statePath, modifiy)

}

const country = function () {
  const data = fs.readFileSync('json/countries.json')
  let ctn_data = JSON.parse(data).countries;
  ctn_data.forEach(async (e) => {
    console.log("country " + e.name);
    e.sys_id = uuid.v4()
    const text = 'INSERT INTO countries(name,shortname,phonecode,id) VALUES($1, $2, $3, $4) RETURNING *'
    const values = [e.name, e.sortname, e.phoneCode, e.sys_id];
    try {
      const res = await client.query(text, values)
      console.log(res.rows[0])
      array.push(res.rows[0])
      // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
    } catch (err) {
      console.log(err.stack)
    }
    state(e.sys_id, e.id + '')
  });
  console.log("countries completed");
  // var modifiy = JSON.stringify(ctn_data).replace(/\[|\]/g, '') + ',\n'
  // console.log(modifiy);
  // fs.appendFileSync(cntPath, modifiy)
}
// country()
/*
  client.query('SELECT NOW()', (err, res) => {
    if (err) throw err
    console.log(res)
    client.end()
  })
*/
// country();
// const cat = [
//   {
//     name: "Education",
//     description: "Provide help related to education."
//   },
//   {
//     name: "Financial",
//     description: "Provide financial help."
//   },
//   {
//     name: "Medical",
//     description: "Provide medical help."
//   },
//   {
//     name: "Counsaling",
//     description: "Provide help by counsaling the person."
//   },
//   {
//     name: "Psychological",
//     description: "Provide psychological help."
//   },
//   {
//     name: "Other",
//     description: "Provide other type of help."
//   },
//   // {
//   //   name: "Hearing impairment",
//   //   description: "Problem in hearing."
//   // },
//   // {
//   //   name: "Speech Impairment",
//   //   description: "Condition that affects a person’s ability to produce sounds that create words."
//   // },
//   // {
//   //   name: "Mental Illness",
//   //   description: "Below average intelligence and set of life skills present before age 18.."
//   // },
// ]
const array = []
try {
  const data = fs.readFileSync('updateJson/events.json')
  const parsed = JSON.parse(data).data
// console.log(state); 
function createRecord(data) {
  data.forEach(async (e) => {
    // e.id = uuid.v4()
    const text = 'INSERT INTO events(name, message, id) VALUES($1, $2, $3) RETURNING *'
    const values = [e.name, e.message, e.id];
    try {
      const res = await client.query(text, values)
      console.log(res.rows[0])
      array.push(res.rows[0])
      // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
    } catch (err) {
      console.log(err.stack)
    }
  });
}

createRecord(parsed);
console.log(array);
console.log('completed');
} catch (error) {
  console.log(error);
}
