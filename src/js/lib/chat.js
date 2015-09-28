var Chat = function(options){};

Chat.prototype.default = function(args){
  Chat.send(args.join(" "));
};

Chat.send = function(message){
  socket.emit('chat', "@"+ engine.player.name + ": "+ message);
};

Chat.receive = function(message){
  engine.append(message);
};

Engine.prototype.chat = new Chat();