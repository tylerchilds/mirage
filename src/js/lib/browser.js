var Browser = function(){};

Browser.prototype.open_link = function(url){
	if(_.isUndefined(url)) return engine.append("Url must be specified");
	
  var win = window.open(url, '_blank');
	if(win){
		win.focus();
		engine.append("Opened: " + url);
	}else{
		engine.append('Popups have been disabled')
	}
};

Browser.prototype.default = function(args){
  engine.browser.open_link(args[0]);
};

Engine.prototype.browser = new Browser();