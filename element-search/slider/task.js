// Домашнее задание к занятию 1.2 «Способы поиска нужного HTML-элемента».
// Задание 3. Слайдер.

class Slider {
    /**
     * Слайдер
     * @param slidesClasses: Классы слайдера
     * @param navigationClasses: Классы навигатора
     * @param arrows: Стрелки - управляющий элемент слайдера, подкл/откл
     * true - по умолчанию
     * @param dots: Точки - управляющий элемент слайдера, подкл/откл
     * true - по умолчанию
     */
    constructor(arrows = true, dots = true,
                slidesClasses = {
                    className: 'slider',
                    itemsClass: 'slider__items',
                    itemClass: 'slider__item',
                    imgClass: 'slider__image',
                    classActivator: 'slider__item_active'
                },
                navigationClasses = {
                    arrowClasses: {
                        className: 'slider__navigation',
                        itemsClass: 'slider__arrows',
                        itemClass: 'slider__arrow',
                        preClass: 'slider__arrow_prev',
                        nextClass: 'slider__arrow_next'
                    },
                    dotClasses: {
                        className: 'slider__dots',
                        itemClass: 'slider__dot',
                        classActivator: 'slider__dot_active'
                    }
                }) {
        this.slidesClasses = slidesClasses;
        this.arrowClasses = navigationClasses.arrowClasses
        this.dotClasses = navigationClasses.dotClasses;
        this.slides = Array.from(this.gatherSlides());
        this.arrows = this.getNavigator(arrows, dots).arrows;
        this.dots = this.getNavigator(arrows, dots).dots;
        this.handlers = null;
        this.pointer = 0;
    }

    getNavigator(arrows, dots) {
        if (!arrows && !dots) {
            arrows = true;
            dots = true; }
        return {
            arrows: arrows ? Array.from(this.gatherArrowButtons()) : null,
            dots: dots ? Array.from(this.gatherDotButtons()) : null }
    }

    gatherSlides = () => Array.from(document.querySelector(
            'div.' + this.slidesClasses.className + ' div.' + this.slidesClasses.itemsClass).querySelectorAll(
                'div.' + this.slidesClasses.itemClass));

    gatherArrowButtons = () => document.querySelector('div.' + this.arrowClasses.className).querySelectorAll(
        'div.' + this.arrowClasses.itemsClass  + ' div.' + this.arrowClasses.itemClass);

    gatherDotButtons = () => document.querySelector('div.' + this.dotClasses.className).querySelectorAll(
            'div.' + this.dotClasses.itemClass);

    set handlers (obj) {
        if (obj === undefined || obj=== null || isNaN(obj)) {
            this._handlers = {
                mouse: {
                    arrows: this.setMouseHandlersForArrows(),
                    dots: this.setMouseHandlersForDots()
                }}}
    }

    get handlers () { return this._handlers }

    set pointer (index) {
        if (this._pointer === undefined) {
            this._pointer = 0;
            this.activateCurrentDot();
        } else {
            index = index ? parseInt(index) : 0;
            index = index < 0 ? this.slides.length -1 : index;
            index = index < this.slides.length ? index : 0;
            if (index !== this._pointer) {
                this.deactivateCurrentSlide();
                this.deactivateCurrentDot();
                this._pointer = index;
                this.activateCurrentSlide();
                this.activateCurrentDot(); }
        }
    }

    get pointer () { return this._pointer; }

    activeSlide = () => this.slides[this._pointer];

    activeDot = () => this.dots[this._pointer];

    activateCurrentDot() {
        if (this.dots && !this.activeDot().className.includes(this.dotClasses.classActivator)) {
            this.activeDot().classList.add(this.dotClasses.classActivator); }
    };

    deactivateCurrentDot() {
        if (this.dots && this.activeDot().className.includes(this.dotClasses.classActivator)) {
            this.activeDot().classList.remove(this.dotClasses.classActivator); }
    };

    activateCurrentSlide() {
        if (!this.activeSlide().className.includes(this.slidesClasses.classActivator)) {
            this.activeSlide().classList.add(this.slidesClasses.classActivator); }
    }

    deactivateCurrentSlide() {
        if (this.activeSlide().className.includes(this.slidesClasses.classActivator)) {
            this.activeSlide().classList.remove(this.slidesClasses.classActivator); }
    }

    activatePreSlide() { --this.pointer; }

    activateNextSlide() { ++this.pointer; }

    setMouseHandlersForArrows() {
        let handlers = {intervalID: 0};

        handlers.mouseupHandler = function (event) { clearInterval(this.handlers.mouse.arrows.intervalID); }.bind(this);

        handlers.mousedownHandler = function (event, startDelay = 4, pressDelay = 555) {
            let isLeftArrow = event.target.className.includes(this.arrowClasses.preClass);
            let slidesAction = isLeftArrow ? this.activatePreSlide.bind(this) : this.activateNextSlide.bind(this);

            let currentDelay = startDelay;
            let start = new Date().getTime();

            this.handlers.mouse.arrows.intervalID =  setInterval(() => {
                if (new Date().getTime() - start < currentDelay) {
                    currentDelay = pressDelay + start - new Date().getTime();
                } else {
                    slidesAction();
                    currentDelay = pressDelay;
                    start = new Date().getTime();
                }},  currentDelay);
        }.bind(this);

        return handlers;
    }

    setMouseHandlersForDots() {
        return  {
            clickHandler: function (event) {
                let newPointer = this.dots.indexOf(event.target);
                if (this.pointer !== newPointer) {
                    this.pointer = newPointer; }
            }.bind(this) };
    }

    setMouseEventHandlers() {
        if (this.arrows) {
            for (let button of this.arrows) {
                button.addEventListener('mousedown', this.handlers.mouse.arrows.mousedownHandler);
                button.addEventListener('mouseup', this.handlers.mouse.arrows.mouseupHandler);}
        }
        if (this.dots) {
            for (let button of this.dots) {
                button.addEventListener('click', this.handlers.mouse.dots.clickHandler); }
        }
    }

    delMouseEventHandlers() {
        if (this.arrows) {
            for (let button of this.arrows) {
                button.removeEventListener('mousedown', this.handlers.mouse.arrows.mousedownHandler);
                button.removeEventListener('mouseup', this.handlers.mouse.arrows.mouseupHandler); }
        }
        if (this.dots) {
            for (let button of this.dots) {
                button.removeEventListener('click', this.handlers.mouse.dots.clickHandler); }
        }
    }

    start() {this.setMouseEventHandlers();}
    stop() {this.delMouseEventHandlers();}
}

// ================================================================     СТАРТ:

// let slider = new Slider(0,0); // Ok!
// let slider = new Slider(1,0); // Ok!
// let slider = new Slider(0); // Ok!
let slider = new Slider(); // Ok!
slider.start();
