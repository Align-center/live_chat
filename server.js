var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

var options = {
    dotfiles: 'ignore',
    etag: false,
    extensions: ['htm', 'html', 'css', 'js'],
    index: false,
    maxAge: '1d',
    redirect: false,
    setHeaders: function (res, path, stat) {
      res.set('x-timestamp', Date.now())
    }   
}

app.use(express.static('public'));
  
io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', function() {
        console.log('User disconnected');
    })

    socket.on('chat message', function(data) {
        io.emit('chat message', data);
    })
});
  
http.listen(3000, () => {
    console.log('listening on *:3000');
});