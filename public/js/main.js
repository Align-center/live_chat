'use strict';

document.addEventListener('DOMContentLoaded', function() {

    var socket = io();
    var username = '';
    var messages;

    function playAudio(url) {

        new Audio(`audio/${url}.mp3`).play();
    }

    function createMessage(name, time, msg, className) {

        if (className == undefined) {
            className = '';
        }

        $('#messages').append(`
            <div class='message  ${className}'>
                <p class='names'>${name} - <small>${time}</small></p>
                <p>${msg}</p>
            </div>
            `);
    }

    $('#connect').submit(function(e) {
        e.preventDefault();

        username = $('#username').val();

        $('#messages').removeClass('invisible');
        $('#sender').removeClass('invisible');
        $('#connect').addClass('invisible');

        messages = document.querySelector('#messages');
    });

    $('#sender').submit(function(e) {
        e.preventDefault();

        let message = $('#message').val();
        let name = username;

        let data = [message, name];

        socket.emit('chat message', data);

        $('#message').val('');
    });

    socket.on('chat message', function(data) {

        let msg = data[0];
        let name = data[1];

        if (msg.charAt(0) == '!') {

            msg = msg.slice(1);

            if (msg == "wizz") {
                $("html").addClass('wizz');
                playAudio(msg);

                setTimeout(function() {
                    $("html").removeClass('wizz');
                }, 2000);
            }
            
        } else {
            let date = new Date();

            let hours = date.getHours();
            let minutes = date.getMinutes();
            let seconds = date.getSeconds();
            let time = hours + ':' + minutes + ':' + seconds;

            if (name == username) {

                createMessage(name, time, msg, 'self');
            }
            else {

                createMessage(name, time, msg);
            }
        }

        $('#messages').animate({ scrollTop: messages.scrollHeight}, 1000);

    });
});


