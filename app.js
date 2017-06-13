var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var request = require('request');

var TIME = 4000;


app.get('/', function(req, res){
  res.sendFile('index.html', { root: __dirname });
});

//console.log(__dirname); -> /Users/admin/Documents/git_repos/test_socketIo
const Influx = require('influx');

const influx = new Influx.InfluxDB({
  host: 'localhost',
  database: 'supplydb',
  schema: [
    {
      measurement: 'sup_data',
      fields: {
        driver_u: Influx.FieldType.INTEGER,
        s2id: Influx.FieldType.INTEGER
      },
      tags: [
        'start_time','end_time'
      ]
    }
  ]
})

influx.query('select * from ').then(results => {
  console.log(results)
})

//var users = 0;
//var obj = {'a':1,'b':2};
////Whenever someone connects this gets executed
//io.on('connection', function(socket){
  //users++;
  //console.log('A user connected'+users);
  ////io.sockets.emit('broadcast',users);
  //var val;
  //socket.on('clientData',function(data){
    ////val=data;
    //var url="http://localhost:8086/query";
    //var propertiesObject = { db:'bigsupply', q:'SELECT * FROM supply_data' };
    //request({url:url, qs:propertiesObject}, function(err, response, body) {
      //if(err) { console.log(err); return; }
      ////console.log("Get response: " + response.statusCode);
      //console.log(response);
      //val=response.body;
    //});
  //});

  //setInterval(function(){
		////Sending an object when emmiting an event
    //socket.emit('dbData',val);
	//}, TIME);

  ////Whenever someone disconnects this piece of code executed
  //socket.on('disconnect', function () {
    //console.log('A user disconnected');
    //users--;
  //});
//});

//http.listen(3000, function(){
  //console.log('listening on *:3000');
//});
//var app = require('express')();
//var http = require('http').Server(app);
//var io = require('socket.io')(http);

//app.get('/', function(req, res){
  //res.sendFile('index.html', { root: __dirname });
//});

//var nsp = io.of('/my-namespace');
//nsp.on('connection', function(socket){
  //console.log('someone connected');
  //nsp.emit('hi', 'Hello everyone!');
//});
//http.listen(3000, function(){
  //console.log('listening on localhost:3000');
//})
;
