// STRICT MODE
"use strict";
// init Map

let mapLyon = new Map(45.7578137,4.8320114);
mapLyon.initMap()

//---VERIFY DOM IS FULLY LOADED
document.addEventListener('DOMContentLoaded', function() {

    //---SLIDER INIT
    let slider = new slider(document.getElementById("slider__bloc"), {
        slidesToScroll: 4,
        slideAuto: true,
    });

    /*let slider = new Slider();
    slider.next();*/



//---CANVAS INIT
    let canvas = new Canvas(document.getElementById("canvas"), "2d", "#000000");
    canvas.initCanvas()
    canvas.initMouse();
    canvas.initTouch();
    canvas.reservation();
});