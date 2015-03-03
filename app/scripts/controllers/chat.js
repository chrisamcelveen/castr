'use strict';

var dataInfo;
var app = angular.module('castrApp');

app.controller('ChatCtrl', ['$http', function($http) {
    var self = this;
    self.data = [{content: 'Sent from client', author: 'Mikebrash'}];
    self.newMsg = false;

    // ----------------------- DERICKS SPACE --------------------
    var update = function(msg) {
        console.log('update');
        // console.log(msg)
        self.data = msg;
        console.log('below');
        console.log(msg);
    };

    // var getData = function() {
    //     setTimeout(function () {
    //         $http.get('/api/chats.json').success(function(data){
    //             // self.data = data
    //             self.data = dataInfo
    //             console.log('below me')
    //             console.log(self.data)
    //         }).error(function(data){})      
    //         getData();
    //         self.data = dataInfo
    //         self.data = [{content: 'Sent from client', author: 'Fuckface'}]
    //         // console.log(self.data)
    //     }, 2500);
    // };
    // getData()

    var socket = io('http://localhost:3000');
        var msgs;
        socket.on('33602', function(msg) {
            dataInfo = msg;
            update(msg);
            // self.data = msg
            // console.log(self.data.length + ' rs')
        });

        socket.on('connect', function(){
            
            console.log('Client Connected');           
            socket.emit('33602', {content: 'Sent from client', author: 'Mikebrash'});
   
        });

// ----------------------- MIKES SPACE --------------------

    self.sendMsg = function() {
        // add new message to array
        var newMsg = {'content':self.newMessage, 'author': 'You'};
        self.data.push(newMsg);
        console.log(self.data);

        // push message to database
        // $http.post('/api/chats.json', newMsg).success(function(data){
        // }).error(function(){})
        
        // clear out old message
        self.newMessage = '';
    };
}]);

app.filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
});


var map;
L.mapbox.accessToken = 'pk.eyJ1IjoibWJyYXNoIiwiYSI6IjlQNWZIUUUifQ.xNcL13PeWvMEAqslBpGBOw';

// generate map
var generateMap = function(lat, lon) {
        map = L.mapbox.map('map', 'examples.map-i86nkdio')
            .setView([lat, lon], 15);

        // place user
        placePerson(lat, lon, 'You', '#A33');
        placePerson(lat + 0.005, lon + 0.005, 'Derick');
        placePerson(lat - 0.002, lon - 0.0025, 'Mariah');
    }; // end generateMap

// generate marker for user
var placePerson = function(lat, lon, name, color) {
    var color = color || '#33A';

    // add marker for user
    L.mapbox.featureLayer({
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [lon, lat]
        },
        properties: {
            title: name,
            'marker-size': 'medium',
            'marker-color': color,
            'marker-symbol': 'circle'
        }
    }).addTo(map);
};

// // get lat and long
if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(function(pos) {
        generateMap(pos.coords.latitude, pos.coords.longitude);
    });
} else {
    window.alert('Please enable geolocation and refresh page.');
}

// // // get lat and long
// if ('geolocation' in navigator) {
//  navigator.geolocation.getCurrentPosition(function(pos) {
//              generateMap(pos.coords.latitude, pos.coords.longitude)
//          });
// } else {
//  window.alert('Please enable geolocation and refresh page.')
// }