//
// Override the wrapText method to take into consideration line breaks and tabs
//
CanvasRenderingContext2D.prototype.wrapText = function (text, x, y, maxWidth, lineHeight) {
  var lines = text.split("\n")
  for (var i = 0; i < lines.length; i++) {
    var words = lines[i].split(' ')
    var line = ''
    for (var n = 0; n < words.length; n++) {
      var testLine = line + words[n] + ' '
      var metrics = this.measureText(testLine)
      var testWidth = metrics.width
      if (testWidth > maxWidth && n > 0) {
        this.fillText(line, x, y)
        line = words[n] + ' '
        y += lineHeight
      }
      else {
        line = testLine
      }
    }
    this.fillText(line, x, y)
    y += lineHeight
  }
}

//
// Interpolates between two c0 and c1 colors or lightens/darkens c0 if c1 is not passed
// Usage: shadeBlend(0.5, "#00ff00")
//        shadeBlend(0.5, "#00ff00", "#ff0000")
//
function shadeBlend(p, c0, c1) {
  var n=p<0?p*-1:p,u=Math.round,w=parseInt
  if(c0.length>7){
      var f=c0.split(","),t=(c1?c1:p<0?"rgb(0,0,0)":"rgb(255,255,255)").split(","),R=w(f[0].slice(4)),G=w(f[1]),B=w(f[2])
      return "rgb("+(u((w(t[0].slice(4))-R)*n)+R)+","+(u((w(t[1])-G)*n)+G)+","+(u((w(t[2])-B)*n)+B)+")"
  }else{
      var f=w(c0.slice(1),16),t=w((c1?c1:p<0?"#000000":"#FFFFFF").slice(1),16),R1=f>>16,G1=f>>8&0x00FF,B1=f&0x0000FF
      return "#"+(0x1000000+(u(((t>>16)-R1)*n)+R1)*0x10000+(u(((t>>8&0x00FF)-G1)*n)+G1)*0x100+(u(((t&0x0000FF)-B1)*n)+B1)).toString(16).slice(1)
  }
}

function calculateVectorSize(x, y) {
  return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
}

function normalizeVector(vec) {
  const size = calculateVectorSize(vec.x, vec.y)
  return {
    x: vec.x / size,
    y: vec.y / size
  }
}

// Draw debug text in canvas
function drawDebugText(ctx, text, x, y) {
  ctx.save()
  ctx.fillStyle = "#ff0000"
  ctx.font = "12pt serif"
  ctx.fillText(text, x, y)
  ctx.restore()
}

function highlightCode() {
  $('pre code').each(function(i, block) {
    hljs.highlightBlock(block)
  })
}

// Modal opening and closing
var genericModal = {
  open:  function() {
    $("#generic-modal").addClass('is-active')
    highlightCode() // Call highlight on any code there might be in the content
  },
  close: function() {
    $("#generic-modal").removeClass('is-active')
    genericModal.clear()
  },
  setTitle: function(text) { $("#generic-modal .modal-card-title").html(text) },
  setContent: function(text) { $("#generic-modal .modal-card-body").html(text) },
  clear: function() {
    $("#generic-modal .modal-card-title").html("")
    $("#generic-modal .modal-card-body").html("")
  }
}

var restartTaskModal = {
  open:  function() { $("#restart-task-modal").addClass('is-active') },
  close: function() { $("#restart-task-modal").removeClass('is-active') },
  setTitle: function(text) { $("#restart-task-modal .modal-card-title").html(text) }
}

var resumeTaskModal = {
  open:  function() { $("#resume-task-modal").addClass('is-active') },
  close: function() { $("#resume-task-modal").removeClass('is-active') },
  setTitle: function(text) { $("#resume-task-modal .modal-card-title").html(text) }
}

var payloadModal = {
  open:  function() { $("#payload-modal").addClass('is-active') },
  close: function() { $("#payload-modal").removeClass('is-active') },
  setTitle: function(text) { $("#payload-modal .modal-card-title").html(text) }
}
