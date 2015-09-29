var socket = io();
var player = JSON.parse(localStorage.getItem('player'));
var history_yeah = {history: localStorage.getItem('history').split(",")};
var engine;

$(function(){
  initialize();
});

var initialize = function(){
  var $input = $('.js-input');
  var $output = $('.js-output');

  player = _.isNull(player) ? new Player() : new Player(player);
  history_yeah = _.isNull(history_yeah) ? new History() : new History(history_yeah);

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
  history_yeah.keyup(ev);
});

$(document).on('submit:command', function(ev, command){
  history_yeah.push(command);
});

socket.on('chat', function(message){
  Chat.receive(message);
});