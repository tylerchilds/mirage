var Engine = function(options) {
  this.prompt = options.prompt;
  this.output = options.output;
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
 
    $(document).trigger('submit:command', value);
  }
  
  this.prompt.val("");

  // scroll down
  $("html, body").animate({ scrollTop: $(document).height() }, 0);
  
};

Engine.prototype.process = function(method, args) {
  if(_.isFunction(this[method])){
    this[method](args);
    return;
  }

  if(_.isObject(this[method])){
    this[method].default(args);
    return;
  }
  
  return this.error();
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

Engine.prototype.clear = function() {
  this.output.empty();
};

Engine.prototype.error = function(){
  this.append("Didn't quite catch that. Try `help` if you need it.");
};

Engine.prototype.walkthrough = function(){
  this.browser.open_link("https://github.com/tylerchilds/mirage#walkthrough");
}
