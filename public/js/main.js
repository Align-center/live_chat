'use strict';

document.addEventListener('DOMContentLoaded', function() {

    var socket = io();

    function playAudio(url) {

        new Audio(`http://127.0.0.1:3000/audio/${url}.mp3`).play();
    }

    $('form').submit(function(e) {
        e.preventDefault();

        let message = $('#message').val();
        let name = $('#name').val()

        let data = [message, name];

        socket.emit('chat message', data);

        $('#message').val('');
    })

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

            $('#messages').append(`<p data-time='${time}' class='message'><span>${name} - </span>${msg}</p>`);
        }


        // Start of message time display
        // $("#messages").on('mouseenter', '.message', function() {

        //     let data = $(this).data('time');

        //     $(this).append(`<small id='time'>${data}</small>`);
        // }).on('mouseleave', '.message', function() {
          
        //     $('#time').remove();
        // });

    })
});


