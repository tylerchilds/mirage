var Engine = function(options) {
  this.prompt = options.prompt;
  this.output = options.output;
  this.player = options.player;
  this.history_index = this.player.history.length;

  this.initialize();
};

Engine.prototype.initialize = function(){
  this.draw();

  this.append("Welcome " + this.player.name);
};

Engine.prototype.submit = function(ev) {
  var value = this.prompt.val().toLowerCase();
  var command = value.split(' ');
  var method = _.first(command);
  var args = _.rest(command);

  if(method != "chat"){
    this.append("$ "+ value);
  }
  
  if(command != ""){
    this.process(method, args);
    this.player.history.push(value);
    this.player.save();
    
    // set history index to the length to start over
    this.history_index = this.player.history.length;
  }
  
  this.prompt.val("");

  // scroll down
  $("html, body").animate({ scrollTop: $(document).height() }, 0);
  
};

Engine.prototype.focus = function() {
  var self = this;
  setTimeout(function() {
    self.prompt.focus();
  }, 1);
};

Engine.prototype.append = function(value) {
  this.output.append("<div>" + value + "</div>");
};

Engine.prototype.process = function(method, args) {
  switch(true){
    case /^name$/.test(method):
      if(args[0]) this.player.set_name(args[0]);
      else this.player.get_name();
      break;
    case /^theme/.test(method):
      this.player.set_theme(args[0]);
      break;
    case /^history$/.test(method):
      this.player.show_history();
      break;
    default:
      if(_.isFunction(this[method])){
        this[method](args);
        return;
      }

      if(_.isObject(this[method])){
        this[method].default(args);
        return;
      }
      
      return this.error();
  }
};

Engine.prototype.keyup = function(ev) {
  if(ev.keyCode == 38) this.history_up();
  if(ev.keyCode == 40) this.history_down();
};

Engine.prototype.history_up = function(ev) {
  if(this.history_index - 1 < 0) return;
  var historical_value = this.player.history[--this.history_index];
  this.prompt.val(historical_value);
};

Engine.prototype.history_down = function(ev) {
  if(this.history_index + 1 > this.player.history.length - 1){
    this.history_index = this.player.history.length;
    return this.prompt.val("");
  } 
  var historical_value = this.player.history[++this.history_index];
  this.prompt.val(historical_value);
};

Engine.prototype.draw = function(){
  $('body').removeClass('theme--dark theme--light').addClass('theme--'+this.player.theme);
}

Engine.prototype.clear = function() {
  this.output.empty();
};

Engine.prototype.error = function(){
  this.append("Didn't quite catch that. Try `help` if you need it.");
};

Engine.prototype.walkthrough = function(){
  this.browser.open_link("https://github.com/tylerchilds/mirage#walkthrough");
}
