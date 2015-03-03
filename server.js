// var http = require('http');
// var express = require('express');
// var io = require('socket.io')(http);
// var app = express();
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//   var host = server.address().address
//   var port = server.address().port

//   console.log('Listening at http://%s:%s', host, port)

// })

io.on("connect", function () {
    console.log("Connected!");
});
var users = []

users = []

var msgs = []

msgs = []

// io.on("connection", function (socket) {
    
// });

io.on('connection', function(socket){
  // on connection add user to array
  users.push(socket)
  console.log(users.length)

  console.log("Connection")

  // get message from client
  socket.on("33602", function(msg) {
      msgs.push(msg)
      console.log("MSGS: "+msgs.length)

      for (var x in users) {
        users[x].emit("33602", msgs);
      }
      
    })
    // remove on disconnect

});

// io.on("33602", function(msg) {
//     console.log(msg)
// })

http.listen(9000, function() {
    console.log('listening on *:9000');
});

// every 5000ms
// send a "ping" to mainChannel
// socket 
// rest function
// getUser()
// hey get current channel request