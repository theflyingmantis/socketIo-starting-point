'use strict'
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var request = require('request');
var hapi = require('hapi');
var dotenv = require('dotenv');
dotenv.load();


//var TIME = 0;


app.get('/', function(req, res){
  res.sendFile('index.html', { root: __dirname });
});

//console.log(__dirname); -> /Users/admin/Documents/git_repos/test_socketIo
const Influx = require('influx');
let pool = Influx.pool;
const influx = new Influx.InfluxDB({
  username: 'abhinav',
  password: '',
  host: 'localhost',
  database: 'testDb',
  schema: [
    {
      measurement: 'supply_data',
      fields: {
        end_time: Influx.FieldType.INTEGER,
        unique_drivers: Influx.FieldType.INTEGER
      },
      tags: [
        's2_id','s2_id_level','vehicle_type','duration'
      ]
    }
  ]
})


var users = 0;
io.on('connection', function(socket){
  users++;
  console.log('A user connected'+users);
  console.log(process.env.DB_HOST);
  var val;
  socket.on('clientData',function(data,callback){
    console.log(data);
    var query = "select* from supply_data limit 1 ";
    var window1=1000;
    influx.query(query).then(results => {
      console.log(results.length);
      callback('server data received callback');
      socket.emit('dbData',JSON.stringify(results,null,2));
    })
      .catch(err => {
        console.error(err);
      })

  });
  socket.on('disconnect', function () {
    console.log('A user disconnected');
    users--;
  });

  socket.on('connect_failed', function(){
    console.log('Connection Failed');
  });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});









// val = results;
// var l = val.length;
// var result = [];
// for (var i=0;i<l;)
// {
//   var drivers = 0;
//   for( var j=0;j<window1;j++)
//   {
//     if(i+j==l)
//       break;
//     drivers += val[i+j].unique_drivers;
//   }
//   drivers=drivers/window1;
//   i=i+window1;
//   var obj = {
//     driver: drivers,
//     time: i+window1/2
//   };
//   result.push(obj);
// }
