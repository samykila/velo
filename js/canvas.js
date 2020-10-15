"use strict";

class Canvas {

    constructor() {
        this.paint = 0;
        this.newX = "";
        this.newY = "";
        this.enableDraw = false;
        this.canvas = document.getElementById("canvas");
        this.clear = document.getElementById("clearCanvas");
        this.canvas.width = 300;
        this.canvas.height = 150;
        this.ctx = this.canvas.getContext("2d");
        this.ctx.lineWidth = 3;
        this.ctx.fillStyle = "black";
        this.touchX = "";
        this.touchY = "";
    }

    initCanvas() {
        this.canvas.addEventListener("mousedown", this.clicDown.bind(this));
        this.canvas.addEventListener("touchstart", this.touchDown.bind(this));
        this.canvas.addEventListener("mousemove", this.draw.bind(this));
        this.canvas.addEventListener("touchmove", this.touchDraw.bind(this));
        this.canvas.addEventListener("mouseup", this.stopDraw.bind(this));
        this.canvas.addEventListener("touchend", this.stopDraw.bind(this));
        this.canvas.addEventListener("mouseout", this.stopDraw.bind(this));
        this.canvas.addEventListener("touchcancel", this.stopDraw.bind(this));
        this.clear.addEventListener("click", this.clearCanvas.bind(this));
    }

    //Partie Souris

    clicDown(e) {
        this.enableDraw = true;
        this.ctx.beginPath();
        this.clic(e);
        this.ctx.moveTo(this.newX, this.newY);
        e.preventDefault();
    }

    clic(e) {
        this.newX = e.offsetX;
        this.newY = e.offsetY;
    }

    draw(e) {
        if (this.enableDraw) {
            this.clic(e);
            this.ctx.lineTo(this.newX, this.newY);
            this.ctx.stroke();
        }
    }
    stopDraw() {
        if (this.enableDraw) {
            this.paint = 1;
        }
        this.enableDraw = false;
    }
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.paint = 0;
    }

    //Partie Touch Responsive

    touchDown(e) {
        this.enableDraw = true;
        this.ctx.beginPath();
        this.touches(e);
        this.ctx.moveTo(this.touchX, this.touchY);
        e.preventDefault();
    }
    touchDraw(e) {
        if (this.enableDraw) {
            this.touches(e);
            this.ctx.lineTo(this.touchX, this.touchY);
            this.ctx.stroke();
        }
    }
    touches(e) {
        let canvasCss = e.target.getBoundingClientRect();
        this.touchX = e.targetTouches[0].clientX - canvasCss.left;
        this.touchY = e.targetTouches[0].clientY - canvasCss.top;
    }
}
let canvas = new Canvas(document.getElementById("canvas"), "2d", "#000000");
canvas.initCanvas()