"use strict";

class Slider {

    options = {};
    currentIndex = 0;
    interval = false;
    element = false;
    items = [];

    /**
     *
     * @param {HTMLElement} element
     * @param {Object} options
     * @param {Object} options.slidesToScroll Nombre d"éléments composant le carrousel
     * @param {boolean} [options.slideAuto = true] Défilement automatique
     *
     */

    constructor(element, options = {}) {
        this.element = element;
        this.setOptions( options );
        this.setSliderUi();
        this.setStyle();
        this.setSliderEvents();
        this.autoStart();
    }

    /**
     * @param {string} className
     * @returns {HTMLElement}
     */
    createElmtWithClass(className) {
        let div = document.createElement("div");
        div.setAttribute("class", className);
        return div;
    }
    setOptions(options) {
        this.options = Object.assign({}, {
            sliderToScroll: 4,
            sliderAuto: true
        }, options)
        console.log(options)
    }

    // Modif DOM

    setSliderUi() {

        let numberSlider = [].slice.call(this.element.children); // Création d"un tableau avec le nombre d"enfants
        this.root       = this.createElmtWithClass("slider__img"); // Conteneur du bloc mobile
        this.panorama   = this.createElmtWithClass("slider__panorama"); // Création du bloc "mobile" du slider

        this.root.setAttribute("tabcurrentIndex", "0");
        this.root.appendChild(this.panorama);
        this.element.appendChild(this.root);

        this.items = numberSlider.map((slider) => {
            let item = this.createElmtWithClass("slider__item");
            item.appendChild(slider);
            this.panorama.appendChild(item);
            return item;
        });
    }

    //Applique les dimensions aux différents éléments du slider

    setStyle() {
        let ratio = this.items.length * 100;
        this.panorama.style.width = ratio + "%";
        this.items.forEach(item => item.style.width = (100 / this.items.length) + "%");
    }
    //Définitions des boutons de navigations du slider

    setSliderEvents() {
        // bouton next et prev

        let nextButton      = document.getElementById("controls__next");
        let previousButton  = document.getElementById("controls__previous");

        nextButton.addEventListener("click", this.goNext.bind(this));
        previousButton.addEventListener("click", this.goPrevious.bind(this));

        // bouton Play & Pause

        let playButton = document.getElementById("controls__play");
        let stopButton = document.getElementById("controls__pause");

        playButton.addEventListener("click", this.play.bind(this));
        stopButton.addEventListener("click", this.stop.bind(this));

        // Evenements sur le slider

        document.addEventListener("keyup", this.keyControl.bind(this));
    }

    goNext() {
        this.gotoSlider(this.currentIndex += 1);
    }

    goPrevious() {
        this.gotoSlider(this.currentIndex -= 1);
    }

    //Déplace le slider vers l"élément ciblé.

    gotoSlider() {
        if(this.currentIndex < 0) {
            this.currentIndex = this.items.length - 1;
        } else if(this.currentIndex >= this.items.length) {
            this.currentIndex = 0;
        }
        let translateX = this.currentIndex * -100 / this.items.length;
        this.panorama.style.transform = "translate3d(" + translateX + "%, 0, 0)";
    }

    // controls au clavier

    keyControl = function(evt) {
        switch(evt.code) {
            case "ArrowRight":
                this.goNext();
                break;
            case "ArrowLeft":
                this.goPrevious();
                break;
            case "Space":
                this.stop();
                break;
            case "Enter":
                this.play();
                break;
        }
    }

    // slide automatiquement

    autoStart() {
        if ( this.options.sliderAuto ){
            this.play();
        }
    }

    // play et stop

    play() {
        if(!this.interval) {
            this.interval = setInterval(this.goNext.bind(this), 5000);
        }
    }

    stop() {
        if(this.interval) {
            clearInterval(this.interval);
            this.interval = false;
        }
    }
}
let slider = new slider(document.getElementById("slider__bloc"), {
    slidesToScroll: 4,
    slideAuto: true,
})
slider.setSliderUi()
