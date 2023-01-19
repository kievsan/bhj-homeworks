// Домашнее задание к занятию 1.2 «Способы поиска нужного HTML-элемента». Слайдер.

// Третье задание работает корректно, но его реализацию сильно упростить. Весь обработчик можно реализовать в 4 действия:
// 1.  С помощью findIndex найдите позицию активного слайда из массива слайдов. Это действие позволит
//     формировать позицию активного слайда без использования глобальной переменной. (???)
// 2.  Скрывайте слайд по найденной позиции
// 2.  Изменяйте позицию для нового активного слайда (с помощью тернарного оператора либо соседний, либо крайний)
// 3.  Выставляйте новый активный слайд
// Получится, по 4 строки на каждый обработчик события. Можете попробовать упростить.


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
    }
}

// ============================================================     SimpleNavigator:

class SimpleNavigator {
    constructor(navigatorClasses, sliderSet = new SliderSet()) {
        this.classes = navigatorClasses;
        this.sliderSet = sliderSet;
        this.handlers = null;
    }

    set handlers (obj) {
        if (this.hasNo(obj)) {
            this._handlers = {mouse: this.setMouseHandlers()};
        }
    }
    get handlers () { return this._handlers }

    hasNo(value) { return value === undefined || value === null || isNaN(value) }

    gatherButtons() {
        return document.querySelector('div.' + this.classes.className).querySelectorAll(
            'div.' + this.classes.buttonClasses.itemsClass + ' div.' + this.classes.buttonClasses.itemClass);
    }

    setMouseHandlers() {
        let handlers = {intervalID: 0};

        handlers.mousedownHandler = function (event, startDelay = 4, pressDelay = 777) {
            let action = event.target.className.includes(this.classes.buttonClasses.preClass)
                ? this.sliderSet.activatePreSlide.bind(this.sliderSet)
                : this.sliderSet.activateNextSlide.bind(this.sliderSet);
            let currentDelay = startDelay;
            let start = new Date().getTime();

            this.handlers.mouse.intervalID =  setInterval(() => {
                // action();  //       В две строки не получается: слишком быстро
                // currentDelay = pressDelay;  //   смена кадров при зажатой кнопке мыши, не отрегулируешь...
                if (new Date().getTime() - start < currentDelay) {
                    currentDelay = pressDelay + start - new Date().getTime();
                } else {
                    action();
                    currentDelay = pressDelay;
                    start = new Date().getTime();
                }},  currentDelay);
        }.bind(this)

        handlers.mouseupHandler = function (event) { clearInterval(this.handlers.mouse.intervalID); }.bind(this);

        return handlers;
    }

    setMouseEventHandlers() {
        for (let button of this.gatherButtons()) {
            button.addEventListener('mousedown', this.handlers.mouse.mousedownHandler);
            button.addEventListener('mouseup', this.handlers.mouse.mouseupHandler);}
    }

    delMouseEventHandlers() {
        for (let button of this.gatherButtons()) {
            button.removeEventListener('mousedown', this.handlers.mouse.mousedownHandler);
            button.removeEventListener('mouseup', this.handlers.mouse.mouseupHandler);}
    }

    start() {this.setMouseEventHandlers();}
    stop() {this.delMouseEventHandlers();}
}

// ============================================================     Navigator: в разработке!

class Navigator extends SimpleNavigator{
    constructor(navigatorClasses, sliderSet = new SliderSet()) {
        super(navigatorClasses, sliderSet);
        console.log(`Создан навигатор с объектом "Точки": ${this.dots}`);
    }
}

// ================================================================     SliderSet:

class SliderSet {
    constructor(sliderClasses) {
        this.classes = sliderClasses;
        this.slides = Array.from(this.gatherSlides());
        this.pointer = 0;
    }

    set pointer (index_) {this._pointer = (this.hasNo(this._pointer)) ? index_ : this._pointer;}
    get pointer () {return this._pointer;}

    hasNo(value) { return value === undefined || value === null || isNaN(value) }

    activeSlide () {return this.slides[this.pointer];}

    activateCurrentSlide() {
        if (!this.activeSlide().className.includes(this.classes.classActivator)) {
            this.activeSlide().classList.add(this.classes.classActivator);
        }
    }

    deactivateCurrentSlide() {
        if (this.activeSlide().className.includes(this.classes.classActivator)) {
            this.activeSlide().classList.remove(this.classes.classActivator);
        }
    }

    activatePreSlide() {  //            в 3 строки
        this.deactivateCurrentSlide()
        this._pointer = --this._pointer < 0 ? this.slides.length -1 : this.pointer;
        this.activateCurrentSlide();
    }

    activateNextSlide() {  //            в 3 строки
        this.deactivateCurrentSlide();
        this._pointer = ++this._pointer === this.slides.length ? 0 : this.pointer;
        this.activateCurrentSlide();
    }

    getSlider() {return  document.querySelector('div.' + this.classes.className + ' div.' + this.classes.itemsClass);}

    gatherSlides() {return this.getSlider().querySelectorAll('div.' + this.classes.itemClass);}
}

// ================================================================     СТАРТ:

let slider = new Slider();
slider.navigator.start();

