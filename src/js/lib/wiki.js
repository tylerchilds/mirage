var Wiki = function(){};

Wiki.prototype.search = function(search){
	var url = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=";
	$.ajax({
		type: "GET",
		url: url + search,
		crossDomain: true,
		contentType: "application/json; charset=UTF-8",
    dataType: "jsonp",
    success: function(data){
    	Wiki.format(data.query.pages);
    },
    error: function(){
    	Wiki.error(string);
    }
	});
};

Wiki.prototype.default = function(args){
  engine.wiki.search(capitalizeEachWord(args.join(" ")));
};

Wiki.error = function(search){
	engine.append("Could not wikify " + search);
}

Wiki.format = function(data){
	var extract;
	_.every(data, function(obj){
		return extract = obj.extract;
	});

	if(_.isUndefined(extract)){
		var error;
		_.every(data, function(obj){
		return error = obj.title;
	});
		return Wiki.error(error);
	}

	return engine.append(_.first(extract.split('.')));
};

Engine.prototype.wiki = new Wiki();