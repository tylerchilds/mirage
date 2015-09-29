var socket = io();
var player = JSON.parse(localStorage.getItem('player'));
var log = {history: localStorage.getItem('history').split(",")};
var engine;

$(function(){
  initialize();
});

var initialize = function(){
  var $input = $('.js-input');
  var $output = $('.js-output');

  player = _.isNull(player) ? new Player() : new Player(player);
  log = _.isNull(log) ? new History() : new Log(log);

  engine = new Engine({
    prompt: $input, 
    output: $output,
    player: player
  });

  setInterval(function(){
    engine.focus();
  });
}

$(document).on('submit', '.js-prompt', function(ev){
  ev.preventDefault();
  engine.submit(ev);
  return false;
});

$(document).on('keyup', '.js-input', function(ev){
  log.keyup(ev);
});

$(document).on('submit:command', function(ev, command){
  log.push(command);
});

socket.on('chat', function(message){
  Chat.receive(message);
});