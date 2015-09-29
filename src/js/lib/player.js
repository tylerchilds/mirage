var Player = function(options){
  var settings = {
    name: "Link",
    theme: "dark"
  };

  _.extend(settings, options);
  this.name = settings.name;
  this.theme = settings.theme;

  this.initialize();
};

Player.prototype.initialize = function(){
  this.swap_theme();
};

Player.prototype.set_name = function(name) {
  this.name = name;
  engine.append("Name changed to: " + name);
  this.save();
};

Player.prototype.get_name = function() {
  engine.append("Your name is: " + this.name);
};

Player.prototype.swap_theme = function(){
  $('body').removeClass('theme--dark theme--light').addClass('theme--'+ this.theme);
}

Player.prototype.save = function() {
  localStorage.setItem('player', JSON.stringify(this));
};

Engine.prototype.name = function(args){
  if(args[0]) player.set_name(args[0]);
  else player.get_name();
};

Engine.prototype.theme = function(args){
  if(args[0] == 'dark' || args[0] == 'light'){
    player.theme = args[0];
    player.swap_theme();
    player.save();
    return engine.append("Theme updated")
  }

  engine.append("Only themes available are `dark` or `light`.");
};