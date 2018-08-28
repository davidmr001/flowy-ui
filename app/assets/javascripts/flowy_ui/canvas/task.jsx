class Task extends TextBox {
  constructor(attributes) {
    super({
      ...attributes,
      text: attributes.task.name + " (" + attributes.task.id + ")"
    })

    this.task = attributes.task

    // this.on = true
    // this.startTime = new Date()

    this.mouseOverColor = this.fillColor
    this.setColorsFromState()

    if (this.task.class_source) {
      this.sourceCodeCard = new SourceCodeCard(300, 300, this.task.class_source)
    }

    // this.animating = this.task.state == "ERROR"
    // this.animationPulse = 500 // ms
  }

  setColorsFromState() {
    switch(this.task.state) {
      case "READY_TO_PROCESS":
        this.text.strokeColor = "#000000"
        this.square.fillColor = "#8ec0e4"
        break
      case "QUEUED":
        this.text.strokeColor = "#000000"
        this.square.fillColor = "#fd8d08"
        break
      case "WAITING_FOR_INPUT":
        this.text.strokeColor = "#000000"
        this.square.fillColor = "#ffd300"
        break
      case "COMPLETED":
        this.text.strokeColor = "#ffffff"
        this.square.fillColor = "#00aa00"
        break
      case "ERROR":
      case "ABORTED":
        this.text.strokeColor = "#000000"
        this.square.fillColor = "#ee0000"
        break
      default:
        this.text.strokeColor = "#000000"
        this.square.fillColor = "#ffffff"
    }
  }

  // swapColorsIfAnimating() {
  //   const now = new Date()
  //   if (now - this.startTime > this.animationPulse) {
  //     this.startTime = now
  //     if (this.on) {
  //       this.textColor = "black"
  //       this.fillColor = "white"
  //     } else {
  //       this.setColorsFromState()
  //     }
  //     this.on = !this.on
  //   }
  // }

  //
  // Shades a color by a percentage, or mixes two colors
  //
  shadeBlend(p, c0, c1) {
    var n=p<0?p*-1:p,u=Math.round,w=parseInt
    if(c0.length>7){
        var f=c0.split(","),t=(c1?c1:p<0?"rgb(0,0,0)":"rgb(255,255,255)").split(","),R=w(f[0].slice(4)),G=w(f[1]),B=w(f[2])
        return "rgb("+(u((w(t[0].slice(4))-R)*n)+R)+","+(u((w(t[1])-G)*n)+G)+","+(u((w(t[2])-B)*n)+B)+")"
    }else{
        var f=w(c0.slice(1),16),t=w((c1?c1:p<0?"#000000":"#FFFFFF").slice(1),16),R1=f>>16,G1=f>>8&0x00FF,B1=f&0x0000FF
        return "#"+(0x1000000+(u(((t>>16)-R1)*n)+R1)*0x10000+(u(((t>>8&0x00FF)-G1)*n)+G1)*0x100+(u(((t&0x0000FF)-B1)*n)+B1)).toString(16).slice(1)
    }
  }

  draw(ctx, x, y) {
    // if (this.animating) {
    //   this.swapColorsIfAnimating()
    // }

    // Adjust box with if text is bigger
    // const textWidth = this.text.getTextWidth(ctx)
    // if (textWidth > this.width) {
    //   this.width  = textWidth + 20
    // }

    // Detect mouse over
    const originalFillColor = this.square.fillColor
    if (this.mouseOver) {
      this.square.fillColor = this.shadeBlend(-0.1, this.square.fillColor)
    }

    super.draw(ctx, x, y)

    this.square.fillColor = originalFillColor

    // if (isMouseOver && this.sourceCodeCard) {
    //   this.sourceCodeCard.draw(ctx, mouseX + 50, mouseY)
    // }
  }
}
