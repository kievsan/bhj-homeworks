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
                }
    ) {
        this.slider = new SliderSet(sliderClasses);
        this.arrows = new Navigator(navigatorClasses, this.slider, true, false);
        this.dots = new Navigator(navigatorClasses, this.slider, false);
        this.advanced = new Navigator(navigatorClasses, this.slider);
    }
}

// ============================================================     Navigator:

class Navigator {
    /**
     * Навигатор Слайдера
     * @param navigatorClasses: Классы управляющих элементов слайдера
     * @param sliderSet: Хранилище слайдеров
     * @param arrows: Стрелки - управляющий элемент слайдера, подкл/откл
     * true - по умолчанию
     * @param dots: Точки - управляющий элемент слайдера, подкл/откл
     * true - по умолчанию
     */
    constructor(navigatorClasses, sliderSet, arrows = true, dots = true) {
        this.classes = navigatorClasses;
        this.sliderSet = sliderSet;
        this.handlers = null;
        this.hasArrows = arrows;
        this.dots = dots ? new DotsSet(navigatorClasses.dotClasses, sliderSet) : null;
    }

    set handlers (obj) {
        if (this.hasNo(obj)) {
            // this._handlers = { mouse: this.setMouseHandlersForSliderNavigation() };
            this._handlers = {};
            this._handlers.mouse = {
                arrows: this.setMouseHandlersForSliderNavigation(),
                dots: this.setMouseHandlersForSliderDots()
            }
        }
    }
    get handlers () { return this._handlers }

    hasNo(value) { return value === undefined || value === null || isNaN(value) }

    gatherArrowButtons() {
        return document.querySelector('div.' + this.classes.arrowClasses.className).querySelectorAll(
            'div.' + this.classes.arrowClasses.itemsClass  + ' div.' + this.classes.arrowClasses.itemClass);
    }

    setMouseHandlersForSliderNavigation() {
        let handlers = {intervalID: 0};

        handlers.mousedownHandler = function (event, startDelay = 4, pressDelay = 555) {
            let action = event.target.className.includes(this.classes.arrowClasses.preClass)
                ? this.sliderSet.activatePreSlide.bind(this.sliderSet)
                : this.sliderSet.activateNextSlide.bind(this.sliderSet);
            let currentDelay = startDelay;
            let start = new Date().getTime();

            this.handlers.mouse.arrows.intervalID =  setInterval(() => {
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

        handlers.mouseupHandler = function (event) { clearInterval(this.handlers.mouse.arrows.intervalID); }.bind(this);

        return handlers;
    }

    setMouseHandlersForSliderDots() {
        return  {
            clickHandler: function (event) {
                let newPointer = this.dots.arr.indexOf(event.target);
                if (this.dots.getPointer() !== newPointer) {
                    this.dots.deactivateCurrentDot();
                    this.dots.setPointer(newPointer); }
            }.bind(this)
        };
    }

    setMouseEventHandlers() {
        if (!this.hasArrows && !this.dots) {
            this.hasArrows = true;
            this.hasDots = true;
        }
        if (this.hasArrows) {
            for (let button of this.gatherArrowButtons()) {
                button.addEventListener('mousedown', this.handlers.mouse.arrows.mousedownHandler);
                button.addEventListener('mouseup', this.handlers.mouse.arrows.mouseupHandler);}
        }
        if (this.dots) {
            for (let button of this.dots.gatherDotButtons()) {
                button.addEventListener('click', this.handlers.mouse.dots.clickHandler); }
        }
    }

    delMouseEventHandlers() {
        if (this.hasArrows) {
            for (let button of this.gatherArrowButtons()) {
                button.removeEventListener('mousedown', this.handlers.mouse.arrows.mousedownHandler);
                button.removeEventListener('mouseup', this.handlers.mouse.arrows.mouseupHandler);}
        }
        if (this.dots) {
            for (let button of this.dots.gatherDotButtons()) {
                button.removeEventListener('mousedown', this.handlers.mouse.dots.mousedownHandler);
                button.removeEventListener('mouseup', this.handlers.mouse.dots.mouseupHandler);}
        }
    }

    start() {this.setMouseEventHandlers();}
    stop() {this.delMouseEventHandlers();}
}

// ================================================================     DotsSet:

class DotsSet {
    constructor(dotClasses, sliderSet) {
        this.classes = dotClasses;
        this.sliderSet = sliderSet;
        this.arr = Array.from(this.gatherDotButtons());
    }

    setPointer = (index) => {
        index = ( index ? Math.abs(parseInt(index)) : 0) < this.arr.length ? index : 0;
        if (index !== this.getPointer()) {
            this.deactivateCurrentDot();
            this.sliderSet.pointer = index;
            this.activateCurrentDot(); }
    }
    getPointer = () => this.sliderSet.pointer;

    getActiveSlide = () => this.sliderSet.activeSlide();

    gatherDotButtons() {
        return document.querySelector('div.' + this.classes.className).querySelectorAll(
            'div.' + this.classes.itemClass);
    }

    activeDot = () => this.arr[this.getPointer()];

    activateCurrentDot() {
        if (!this.activeDot().className.includes(this.classes.classActivator)) {
        this.activeDot().classList.add(this.classes.classActivator); }
    };

    deactivateCurrentDot() {
        if (this.activeDot().className.includes(this.classes.classActivator)) {
            this.activeDot().classList.remove(this.classes.classActivator); }
    };
}

// ================================================================     SliderSet:

class SliderSet {
    constructor(sliderClasses) {
        this.classes = sliderClasses;
        this.slides = Array.from(this.gatherSlides());
        this.pointer = 0;
    }

    set pointer (index) {
        if (this._pointer === undefined) {
            this._pointer = 0
        } else {
            index = index ? Math.abs(parseInt(index)) : 0;
            index = index < this.slides.length ? index : 0;
            if (index !== this._pointer) {
                this.deactivateCurrentSlide();
                this._pointer = index;
                this.activateCurrentSlide(); }
        }
    }
    get pointer () { return this._pointer; }

    activeSlide () { return this.slides[this.pointer]; }

    activateCurrentSlide() {
        if (!this.activeSlide().className.includes(this.classes.classActivator)) {
            this.activeSlide().classList.add(this.classes.classActivator); }
    }

    deactivateCurrentSlide() {
        if (this.activeSlide().className.includes(this.classes.classActivator)) {
            this.activeSlide().classList.remove(this.classes.classActivator); }
    }

    activatePreSlide() {
        this.deactivateCurrentSlide()
        this._pointer = --this._pointer < 0 ? this.slides.length -1 : this.pointer;
        this.activateCurrentSlide();
    }

    activateNextSlide() {
        this.deactivateCurrentSlide();
        this._pointer = ++this._pointer === this.slides.length ? 0 : this.pointer;
        this.activateCurrentSlide();
    }

    getSlider() {return  document.querySelector('div.' + this.classes.className + ' div.' + this.classes.itemsClass);}

    gatherSlides() {return this.getSlider().querySelectorAll('div.' + this.classes.itemClass);}
}

// ================================================================     СТАРТ:

let slider = new Slider();
slider.advanced.start();

