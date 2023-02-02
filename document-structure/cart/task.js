// Домашнее задание к занятию 2.3 «Изменение структуры HTML-документа».
// Корзина товаров

function CartProduct(htmlContainer) {
    this.className = 'cart__product';
    this.htmlContainer = htmlContainer.closest(`.${this.className}`);
    this.id = this.htmlContainer.dataset.id;

    this.classes = {
        img: 'cart__product-image',
        count: 'cart__product-count'
    }

    this.html = {
        img: this.htmlContainer.querySelector(`img.${this.classes.img}`),
        value: this.htmlContainer.querySelector(`.${this.classes.count}`)
    }

    this.img = this.html.img ?? this.html.img.src;
    this.quantity = this.html.value ?? parseInt(this.html.value.textContent);
}

function Product(htmlContainer) {
    this.className = 'product';
    this.htmlContainer = htmlContainer.closest(`.${this.className}`);
    this.id = this.htmlContainer.dataset.id;

    this.classes = {
        title: 'product__title',
        img: 'product__image',
        quantity: 'product__quantity',
        quantityControl: 'product__quantity-controls'
    }

    this.html = {
        title: this.htmlContainer.querySelector(`.${this.classes.title}`),
        img: this.htmlContainer.querySelector(`img.${this.classes.img}`),
        quantity: this.htmlContainer.querySelector(`.${this.classes.quantity}`),
        buttonAdd: this.html.quantity.querySelector(`.product__add`),
        quantityControl: this.html.quantity.querySelector(`.${this.classes.quantityControl}`),
        value: this.html.quantityControl.querySelector(`.product__quantity-value`),
        buttonDec: this.html.quantityControl.querySelector(`.product__quantity-control_dec`),
        buttonInc: this.html.quantityControl.querySelector(`.product__quantity-control_inc`)
    }

    this.name = this.html.title ?? this.html.title.textContent;
    this.img = this.html.img ?? this.html.img.src;
    this.quantity = this.html.value ?? parseInt(this.html.value.textContent);

    this.handlers = {
        start: () => {
            this.buttonDec.addEventListener('click', myHandlers.cart.clickOnButtonDec);
            this.buttonInc.addEventListener('click', myHandlers.cart.clickOnButtonInc);
            this.buttonAdd.addEventListener('click', myHandlers.cart.clickOnButtonAdd);
        },
        stop: () => {
            this.buttonDec.removeEventListener('click', myHandlers.cart.clickOnButtonDec);
            this.buttonInc.removeEventListener('click', myHandlers.cart.clickOnButtonInc);
            this.buttonAdd.removeEventListener('click', myHandlers.cart.clickOnButtonAdd);
        }
    }
}

class GroceryShelf {
    constructor(htmlContainer = document.body.querySelector(`.products`)) {
        this.className = 'products';
        this.classes = { product: 'product' }
        this.html = {
            container: () => htmlContainer.closest(`.${this.className}`),
            products: () => this.html.container()
                ?? this.html.container().querySelectorAll(`.${this.classes.product}`)
        }
        this.activateButtons();
    }

    list = () => this.html.products().map( (htmlContainer) => new Product(htmlContainer) );

    activateButtons = () => this.list().forEach( (product) => product.handlers.start() );

    deactivateButtons = () => this.list().forEach( (product) => product.handlers.stop() );

}

class GroceryCart {
    constructor(htmlContainer = document.body.querySelector(`.cart`)) {
        this.className = 'cart';
        this.classes = {
            title: 'cart__title',
            products: 'cart__products',
            product: 'cart__product'
        }
        this.html = {
            container: () => htmlContainer.closest(`.${this.className}`),
            products: () => this.html.container()
                ?? this.html.container().querySelectorAll(`.${this.classes.product}`),
            title: this.html.container().querySelector(`.${this.classes.title}`)
        }
        this.name = this.html.title ?? this.html.title.textContent;
    }

    list = () => this.html.products().map( (htmlContainer) => new CartProduct(htmlContainer) );
}

class GroceryCustomer {
    constructor(cart = new GroceryCart()) {
        this.cart = cart;
    }

}

class GroceryStore {
    constructor(shelves = [new GroceryShelf()],
                customers = [new GroceryCustomer()]) {
        this.shelves = shelves;
        this.customers = customers;
    }
}

function setCartEventHandlers() {
    let handlers = { currentTaskText: '' }

    handlers.clickOnButtonAdd = (event) => {

    }

    handlers.clickOnButtonDec = (event) => {

    }

    handlers.clickOnButtonInc = (event) => {

    }

    return handlers;
}

function setEventHandlers() {
    let handlers = {};
    handlers.cart = setCartEventHandlers();
    return handlers;
}

function startHandlers() {
    todoList.html.button.addEventListener('click', myHandlers.cart.clickOnButtonAdd);
    todoList.html.button.addEventListener('click', myHandlers.cart.clickOnButtonDec);
    todoList.html.button.addEventListener('click', myHandlers.cart.clickOnButtonInc);
}

function stopHandlers() {
    todoList.html.button.removeEventListener('click', myHandlers.cart.clickOnButtonAdd);
    todoList.html.button.removeEventListener('click', myHandlers.cart.clickOnButtonDec);
    todoList.html.button.removeEventListener('click', myHandlers.cart.clickOnButtonInc);
}


let store = new GroceryStore(),
    myHandlers = setEventHandlers();
startHandlers();


