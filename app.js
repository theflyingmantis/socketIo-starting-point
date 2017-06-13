
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var request = require('request');

var TIME = 0;


app.get('/', function(req, res){
  res.sendFile('index.html', { root: __dirname });
});

//console.log(__dirname); -> /Users/admin/Documents/git_repos/test_socketIo
const Influx = require('influx');

const influx = new Influx.InfluxDB({
  host: 'localhost',
  database: 'bigsupply',
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
  var val;
  socket.on('clientData',function(data){
    var query = "select * from supply_data where vehicle_type='BIKE' limit "+data;

        //***********************************************
    //var url="http://localhost:8086/query";
    //var propertiesObject = { db:'bigsupply', q:query };
    //request({url:url, qs:propertiesObject}, function(err, response, body) {
      //if(err) { console.log(err); return; }
      //val=response.body;
    //});
    //***********************************************

    //Or

    //***********************************************
    influx.query(query).then(results => {
      val = results;
    })
    // **********************************************

  });

  setInterval(function(){
		////////Sending an object when emmiting an event
    socket.emit('dbData',JSON.stringify(val,null,2));
	}, TIME);

  ////////Whenever someone disconnects this piece of code executed
  socket.on('disconnect', function () {
    console.log('A user disconnected');
    users--;
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
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
