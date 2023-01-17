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
        console.log('Создан объект "Простой навигатор" !');
        console.log(this.buttons);  // ----------------------
    }

    getNavigator() {
        return  document.querySelector('div.' + this.classes.className);
    }

    gatherButtons() {
        return this.getNavigator().querySelectorAll(
            'div.' + this.classes.buttonClasses.itemsClass +
            ' div.' + this.classes.buttonClasses.itemClass);
    }

    setEventHandlers(ctrlEvent = 'click', sliderSet = this.sliderSet) {
        let printMsg = (targetText) => console.log('Кликнули "', targetText, '"');
        let buttonClasses = this.classes.buttonClasses;
        for (let button of this.buttons) {
            button.addEventListener(ctrlEvent, function (event) {
                if (button.className.includes(buttonClasses.preClass)) {
                    printMsg('Влево');
                    sliderSet.activatePreSlide();
                }
                if (button.className.includes(buttonClasses.nextClass)) {
                    printMsg('Вправо');
                    sliderSet.activateNextSlide();
                }});}
    }

    start() {
        this.setEventHandlers();
    }
}

// ============================================================     Navigator:

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

    set classActivator (class_) { if (this.hasNo(this._classActivator)) {this._classActivator = class_} }
    get classActivator () { return this._classActivator }

    set pointer (index_) { if (this.hasNo(this._pointer)) {this._pointer = index_} }
    get pointer () { return this._pointer }

    set size (number_) { this._size = this.slides.length }
    get size () {
        this._size = this.slides.length;
        return this._size
    }

    set activeSlide (number_) {
        this._activeSlide = this.slides[this.pointer];
        this.activateCurrentSlide();
    }
    get activeSlide () {
        this._activeSlide = this.slides[this.pointer];
        return this._activeSlide
    }

    activateCurrentSlide() {
        if (!this.slides[this.pointer].className.includes(this.classActivator)) {
            this.slides[this._pointer].classList.add(this.classActivator);
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
        this.deactivateCurrentSlide()
        if (++this._pointer === this.size) {this._pointer = 0}
        this.activateCurrentSlide();
        return this.slides[this._pointer];
    }

    getSlider() {
        return  document.querySelector( // 'div.slider div.slider__items'
            'div.' + this.classes.className +
            ' div.' + this.classes.itemsClass);
    }

    gatherSlides() {
        return this.getSlider().querySelectorAll(
            'div.' + this.classes.itemClass); // + ' img.' + this.classes.imgClass);
    }
}


let slider = new Slider();
slider.navigator.start();


