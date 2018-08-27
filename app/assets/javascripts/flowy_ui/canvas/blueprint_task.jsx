class BlueprintTask extends TextBox {
  constructor(x, y, width, height, task) {
    super(width, height, task.name + " (" + task.id + ")", 14);

    this.task = task;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.on = true;
    this.startTime = new Date();

    this.setColorsFromState();

    if (this.task.class_source) {
      this.sourceCodeCard = new SourceCodeCard(300, 300, this.task.class_source);
    }

    // this.animating = this.task.state == "ERROR";
    // this.animationPulse = 500; // ms
  }

  setColorsFromState() {
    switch(this.task.state) {
      case "COMPLETED":
        this.textColor = "#ffffff";
        this.fillColor = "#00aa00";
        break;
      case "ERROR":
      case "ABORTED":
        this.textColor = "#000000";
        this.fillColor = "#ee0000";
        break;
      default:
        this.textColor = "#000000";
        this.fillColor = "#ffffff";
    }
  }

  // swapColorsIfAnimating() {
  //   const now = new Date();
  //   if (now - this.startTime > this.animationPulse) {
  //     this.startTime = now;
  //     if (this.on) {
  //       this.textColor = "black";
  //       this.fillColor = "white";
  //     } else {
  //       this.setColorsFromState();
  //     }
  //     this.on = !this.on;
  //   }
  // }

  //
  // Shades a color by a percentage, or mixes two colors
  //
  shadeBlend(p, c0, c1) {
    var n=p<0?p*-1:p,u=Math.round,w=parseInt;
    if(c0.length>7){
        var f=c0.split(","),t=(c1?c1:p<0?"rgb(0,0,0)":"rgb(255,255,255)").split(","),R=w(f[0].slice(4)),G=w(f[1]),B=w(f[2]);
        return "rgb("+(u((w(t[0].slice(4))-R)*n)+R)+","+(u((w(t[1])-G)*n)+G)+","+(u((w(t[2])-B)*n)+B)+")"
    }else{
        var f=w(c0.slice(1),16),t=w((c1?c1:p<0?"#000000":"#FFFFFF").slice(1),16),R1=f>>16,G1=f>>8&0x00FF,B1=f&0x0000FF;
        return "#"+(0x1000000+(u(((t>>16)-R1)*n)+R1)*0x10000+(u(((t>>8&0x00FF)-G1)*n)+G1)*0x100+(u(((t&0x0000FF)-B1)*n)+B1)).toString(16).slice(1)
    }
  }

  isMouseOver(x, y) {
    return x >= this.x - this.width / 2 &&
           x <= this.x + this.width / 2 &&
           y >= this.y - this.height / 2 &&
           y <= this.y + this.height / 2;
  }

  draw(ctx, mouseX, mouseY) {
    // if (this.animating) {
    //   this.swapColorsIfAnimating();
    // }

    // Adjust box with if text is bigger
    const textWidth = this.text.getTextWidth(ctx)
    if (textWidth > this.width) {
      this.width  = textWidth + 20;
    }

    // Detect mouse over
    var fillColor = this.fillColor;
    const isMouseOver = this.isMouseOver(mouseX, mouseY);
    if (isMouseOver) {
      fillColor = this.shadeBlend(-0.1, fillColor);
    }

    super.draw(ctx, this.x, this.y, this.textColor, "black", fillColor, true);

    if (isMouseOver && this.sourceCodeCard) {
      this.sourceCodeCard.draw(ctx, mouseX + 50, mouseY);
    }
  }
}
