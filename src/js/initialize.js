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