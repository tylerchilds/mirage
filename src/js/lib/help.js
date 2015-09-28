var Help = function(options){};

Help.prototype.default = function() {  
  Help.standard();
};

Help.standard = function(){
  var help_table = Formatter.table([
    ["name [(nickname)]:", "set or view your player name"],
    ["theme [dark|light]:", "set or view your player name"],
    ["chat [(message)]:", "broadcast a message to your chat room"],
    ["&nbsp;"],
    ["wiki [(search)]:", "search wikipedia"],
    ["browser [url]:", "open a tab with the link"],
    ["walkthrough:", "cheat your way through the game"],
    ["&nbsp;"],
    ["history:", "show your command history"],
    ["help:", "display possible commands"], 
    ["clear:", "clear the output console"]
  ]);
  
  var help = "Commands:<br />" + help_table;
  engine.append(help);
};

Engine.prototype.help = new Help();