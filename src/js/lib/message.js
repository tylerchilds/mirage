var Message = function(options){
  var settings = {
    sender: this.player,
    getter: null,
    message: null
  };

  _.extend(settings, options);
  this.sender = settings.sender;
  this.getter = settings.getter;
  this.message = settings.message;

};

Message.prototype.initialize = function(){
  engine.draw();
};