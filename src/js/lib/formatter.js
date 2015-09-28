var Formatter = function() {};

Formatter.table = function(data) {
  var table = "<table>";
  _.each(data, function(row){
    table += "<tr>";
    _.each(row, function(cell){
      table += "<td>" + cell + "</td>";
    })
    table += "</tr>"
  })
  table += "</table>";
  
  return table;
};

Formatter.array = function(data) {
  var array = "";

  _.each(data, function(row){
    array += row + "<br/>";
  })
  
  return array;
};

Formatter.wrap = function(classname, string) {
  return '<span class="'+ classname +'">'+ string +'</span>';
};