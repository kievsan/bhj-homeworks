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
        buttonAdd: this.htmlContainer.querySelector(`.product__add`),
        quantityControl: this.htmlContainer.querySelector(`.${this.classes.quantityControl}`),
        value: this.htmlContainer.querySelector(`.product__quantity-value`),
        buttonDec: this.htmlContainer.querySelector(`.product__quantity-control_dec`),
        buttonInc: this.htmlContainer.querySelector(`.product__quantity-control_inc`)
    }

    this.name = this.html.title ? this.html.title.textContent: null;
    this.img = this.html.img ? this.html.img.src : null;
    this.quantity = this.html.value ? parseInt(this.html.value.textContent) : null;

    this.handlers = {
        start: () => {
            this.html.buttonDec.addEventListener('click', myHandlers.cart.clickOnButtonDec);
            this.html.buttonInc.addEventListener('click', myHandlers.cart.clickOnButtonInc);
            this.html.buttonAdd.addEventListener('click', myHandlers.cart.clickOnButtonAdd);
        },
        stop: () => {
            this.html.buttonDec.removeEventListener('click', myHandlers.cart.clickOnButtonDec);
            this.html.buttonInc.removeEventListener('click', myHandlers.cart.clickOnButtonInc);
            this.html.buttonAdd.removeEventListener('click', myHandlers.cart.clickOnButtonAdd);
        }
    }
}

class GroceryShelf {
    constructor(htmlContainer = document.body.querySelector(`.products`)) {
        this.className = 'products';
        this.htmlContainer = htmlContainer.closest(`.${this.className}`);
        this.classes = { product: 'product' }
        this.html = { products: () => this.htmlContainer.getElementsByClassName(this.classes.product) }
        // this.activateButtons();
    }

    list = () => [...this.html.products()].map((htmlContainer) => new Product(htmlContainer));

    activateButtons = () => this.list().forEach((product) => product.handlers.start());

    deactivateButtons = () => this.list().forEach((product) => product.handlers.stop());

}

class GroceryCart {
    constructor(htmlContainer = document.body.querySelector(`.cart`)) {
        this.className = 'cart';
        this.htmlContainer = htmlContainer.closest(`.${this.className}`);
        this.classes = {
            title: 'cart__title',
            products: 'cart__products',
            product: 'cart__product'
        }
        this.html = {
            products: () => this.htmlContainer.getElementsByClassName(this.classes.product),
            title: this.htmlContainer.querySelector(`.${this.classes.title}`)
        }
        this.name = this.html.title ? this.html.title.textContent : null;
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
    let handlers = {}

    handlers.clickOnButtonAdd = (event) => {
        console.log('Add');
    }

    handlers.clickOnButtonDec = (event) => {
        console.log('Dec');

    }

    handlers.clickOnButtonInc = (event) => {
        console.log('Inc');

    }

    return handlers;
}

function setEventHandlers() {
    let handlers = {};
    handlers.cart = setCartEventHandlers();
    return handlers;
}

function startHandlers() {
    store.shelves.forEach((shelf) => shelf.activateButtons());
}

function stopHandlers() {
    store.shelves.forEach((shelf) => shelf.deactivateButtons());
}


let store = new GroceryStore(),
    myHandlers = setEventHandlers();

startHandlers();


