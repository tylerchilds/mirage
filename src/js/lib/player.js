var Player = function(options){
  var settings = {
    name: "Link",
    theme: "dark"
  };

  _.extend(settings, options);
  this.name = settings.name;
  this.theme = settings.theme;
};

Player.prototype.set_name = function(name) {
  this.name = name;
  engine.append("Name changed to: " + name);
  this.save();
};

Player.prototype.get_name = function() {
  engine.append("Your name is: " + this.name);
};

Player.prototype.set_theme = function(theme) {
  if(theme == 'dark' || theme == 'light'){
    this.theme = theme;
    engine.draw();
    this.save();
    return engine.append("Theme updated")
  }

  engine.append("Only themes available are `dark` or `light`.");
};

Player.prototype.save = function() {
  localStorage.setItem('player', JSON.stringify(this));
};