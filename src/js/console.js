//= include ../../bower_components/jquery/dist/jquery.js
//= include ../../bower_components/underscore/underscore.js
//= include ../../bower_components/socket.io-client/socket.io.js

//= include lib/player.js
//= include lib/engine.js
//= include lib/formatter.js
//= include lib/message.js

var socket = io();
var current = JSON.parse(localStorage.getItem('player'));
var player;
var engine;

$(function(){
  initialize();

  $(document).on('keyup', '.js-input', function(ev){
    engine.keyup(ev);
  });

  $(document).on('submit', '.js-prompt', function(ev){
    ev.preventDefault();
    engine.submit(ev);
    return false;
  });
});

var initialize = function(){
  var $input = $('.js-input');
  var $output = $('.js-output');

  player = _.isNull(current) ? new Player() : new Player(current)

  engine = new Engine({
    prompt: $input, 
    output: $output,
    player: player
  });

  setInterval(function(){
    engine.focus();
  });
}