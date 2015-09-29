var History = function(options) {
  var settings = {
    history: []
  };

  _.extend(settings, options);
  
  this.history = settings.history;
  this.history_index = this.history.length;
};

History.prototype.up = function(ev) {
  if(this.history_index - 1 < 0) return;
  var historical_value = this.history[--this.history_index];
  engine.prompt.val(historical_value);
};

History.prototype.down = function(ev) {
  if(this.history_index + 1 > this.history.length - 1){
    this.history_index = this.history.length;
    return engine.prompt.val("");
  } 
  var historical_value = this.history[++this.history_index];
  engine.prompt.val(historical_value);
};

History.prototype.keyup = function(ev) {
  if(ev.keyCode == 38) this.up();
  if(ev.keyCode == 40) this.down();
};

History.prototype.push = function(command){
  this.history.push(command);
  localStorage.setItem('history', this.history);
  // set history index to the length to start over
  this.history_index = this.history.length;
};

Engine.prototype.history = function() {
  engine.append(Formatter.array(this.history));
};