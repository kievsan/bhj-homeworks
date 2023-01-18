// Домашнее задание к занятию 1.2 «Способы поиска нужного HTML-элемента». Слайдер.


class Slider {
    constructor(sliderClasses = {
                    className: 'slider',
                    itemsClass: 'slider__items',
                    itemClass: 'slider__item',
                    imgClass: 'slider__image',
                    classActivator: 'slider__item_active'
                },
                navigatorClasses = {
                    className: 'slider__navigation',
                    buttonClasses: {
                        itemsClass: 'slider__arrows',
                        itemClass: 'slider__arrow',
                        preClass: 'slider__arrow_prev',
                        nextClass: 'slider__arrow_next'
                    },
                    dotClasses: {
                        itemsClass: 'slider__dots',
                        itemClass: 'slider__dot'
                    }}) {
        this.slider = new SliderSet(sliderClasses);
        this.navigator = new SimpleNavigator(navigatorClasses, this.slider);
        console.log(`Создан объект "Слайдер" !`);
    }

}

// ============================================================     SimpleNavigator:

class SimpleNavigator {
    constructor(navigatorClasses, sliderSet = new SliderSet()) {
        this.classes = navigatorClasses;
        this.sliderSet = sliderSet;
        console.log(this.getNavigator());  // ----------------------
        this.buttons = this.gatherButtons();
        this.handlers = null;
        console.log('Создан объект "Простой навигатор" !');
        console.log(this.buttons);  // ----------------------
    }

    hasNo(value) { return value === undefined || value === null || isNaN(value) }

    set handlers (obj) {
        if (this.hasNo(obj)) {
            this._handlers = {};
            this._handlers.mouse = this.setMouseHandlers();
        }
    }
    get handlers () { return this._handlers }

    getNavigator() {return  document.querySelector('div.' + this.classes.className);}

    gatherButtons() {
        return this.getNavigator().querySelectorAll(
            'div.' + this.classes.buttonClasses.itemsClass +
            ' div.' + this.classes.buttonClasses.itemClass);
    }

    setMouseHandlers() {
        let handlers = {mousedownIsActive: undefined, button: {}};
        handlers.mouseActionInform = function (button = handlers.button) {
            console.log(`${(handlers.mousedownIsActive) ? `НА` : `ОТ`}ЖАТА кнопка мыши в навигаторе на "${button}"`);
            console.log(`\t${(handlers.mousedownIsActive) ? `` : `НЕ`} МЕНЯЕМ картинку`);
            if (handlers.mousedownIsActive) {
                console.log('\t', this.sliderSet.activeSlide.firstChild.baseURI);
            }
        }.bind(this);
        handlers.doProcessButtons = function (button = handlers.button) {
            if (button.className.includes(this.classes.buttonClasses.preClass)) {
                handlers.mouseActionInform('Влево');
                if (handlers.mousedownIsActive) {
                    this.sliderSet.activatePreSlide();
                }
            }
            if (button.className.includes(this.classes.buttonClasses.nextClass)) {
                handlers.mouseActionInform('Вправо');
                if (handlers.mousedownIsActive) {
                    this.sliderSet.activateNextSlide();
                }
            }
        }.bind(this);
        handlers.mousedownHandler = function (event) {
            handlers.mousedownIsActive = true;
            handlers.doProcessButtons(event.target);
        }.bind(this)
        handlers.mouseupHandler = function (event) {
            handlers.mousedownIsActive = false;
            handlers.doProcessButtons(event.target);
        }.bind(this)
        return handlers;
    }

    setMouseEventHandlers() {
        for (let button of this.buttons) {
            this.handlers.mouse.button = button;
            button.addEventListener('mousedown', this.handlers.mouse.mousedownHandler);
            button.addEventListener('mouseup', this.handlers.mouse.mouseupHandler);}
    }

    delMouseEventHandlers() {
        for (let button of this.buttons) {
            this.handlers.mouse.button = button;
            button.removeEventListener('mousedown', this.handlers.mouse.mousedownHandler);
            button.removeEventListener('mouseup', this.handlers.mouse.mouseupHandler);}
    }

    start() {
        this.setMouseEventHandlers();
    }

    exit() {
        this.delMouseEventHandlers();
    }
}

// ============================================================     Navigator: в разработке!

class Navigator extends SimpleNavigator{
    constructor(navigatorClasses, sliderSet = new SliderSet()) {
        super(navigatorClasses, sliderSet = new SliderSet());
        console.log(`Создан навигатор с объектом "Точки": ${this.dots}`);
    }
}

// ================================================================     SliderSet:

class SliderSet {
    constructor(sliderClasses) {
        this.classes = sliderClasses;
        console.log(this.getSlider());  // ----------------------
        this.slides = Array.from(this.gatherSlides());
        this.size = null;
        this.pointer = 0;
        this.classActivator = sliderClasses.classActivator;
        this.activeSlide = null;
        console.log(`Создан объект "Набор слайдера" !`);
        console.log(this.slides);  // ----------------------
    }

    hasNo(value) { return value === undefined || value === null || isNaN(value) }

    set classActivator (class_) {
        if (this.hasNo(this._classActivator)) {
            this._classActivator = class_;
        }
    }
    get classActivator () {return this._classActivator;}

    set pointer (index_) {
        if (this.hasNo(this._pointer)) {
            this._pointer = index_;
        }
    }
    get pointer () {return this._pointer;}

    set size (number_) {this._size = this.slides.length;}
    get size () {
        this._size = this.slides.length;
        return this._size;
    }

    set activeSlide (number_) {
        this._activeSlide = this.slides[this.pointer];
        this.activateCurrentSlide();
    }
    get activeSlide () {
        this._activeSlide = this.slides[this.pointer];
        return this._activeSlide;
    }

    activateCurrentSlide() {
        if (!this.slides[this.pointer].className.includes(this.classActivator)) {
            this.slides[this._pointer].classList.add(this.classActivator);
            this.activeSlide = 'Этот слайд теперь показывается в слайдере!';
        }
    }

    deactivateCurrentSlide() {
        if (this.slides[this.pointer].className.includes(this.classActivator)) {
            this.slides[this._pointer].classList.remove(this.classActivator);
        }
    }

    activatePreSlide() {
        this.deactivateCurrentSlide()
        if (--this._pointer < 0) { this._pointer = this.size -1 }
        this.activateCurrentSlide();
        return this.slides[this._pointer];
    }

    activateNextSlide() {
        this.deactivateCurrentSlide();
        if (++this._pointer === this.size) {
            this._pointer = 0
        }
        this.activateCurrentSlide();
        return this.slides[this._pointer];
    }

    getSlider() {
        return  document.querySelector(
            'div.' + this.classes.className +
            ' div.' + this.classes.itemsClass);
    }

    gatherSlides() {return this.getSlider().querySelectorAll('div.' + this.classes.itemClass);}
}


let slider = new Slider();
slider.navigator.start();


