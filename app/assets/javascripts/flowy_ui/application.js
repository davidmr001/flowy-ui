// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require activestorage
//= require react
//= require react_ujs
//= require jquery

//= require ./constants
//= require ./canvas
//= require ./components
//= require ./server_rendering

// Override the wrapText method to take into consideration line breaks and tabs
CanvasRenderingContext2D.prototype.wrapText = function (text, x, y, maxWidth, lineHeight) {
  var lines = text.split("\n");
  for (var i = 0; i < lines.length; i++) {
    var words = lines[i].split(' ');
    var line = '';
    for (var n = 0; n < words.length; n++) {
      var testLine = line + words[n] + ' ';
      var metrics = this.measureText(testLine);
      var testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        this.fillText(line, x, y);
        line = words[n] + ' ';
        y += lineHeight;
      }
      else {
        line = testLine;
      }
    }
    this.fillText(line, x, y);
    y += lineHeight;
  }
}
