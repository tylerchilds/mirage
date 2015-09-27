var Message = function(options){};

Message.prototype.default = function(args){
  switch(true){
    case /^send$/.test(args[0]):
      Message.send(_.rest(args).join(" "));
      break;
    default:
      engine.append("Messenger has been shot, message not delivered");
      break;
  }
};

Message.send = function(message){
  socket.emit('chat message', message);
};

Message.receive = function(message){
  engine.append("@"+ engine.player.name + ": " + message);
};

Engine.prototype.message = new Message();