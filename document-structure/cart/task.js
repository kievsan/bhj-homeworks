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

    this.img = this.html.img ? this.html.img.src : null;
    this.quantity = () => this.html.value ? parseInt(this.html.value.textContent.trim()) : null;
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

    this.name = this.html.title ? this.html.title.textContent.trim(): null;
    this.img = this.html.img ? this.html.img.src : null;
    this.quantity = () => this.html.value ? parseInt(this.html.value.textContent.trim()) : null;

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
    static classes = { product: 'product' }

    constructor(htmlContainer = document.body.querySelector(`.products`)) {
        this.className = 'products';
        this.htmlContainer = htmlContainer.closest(`.${this.className}`);
        this.html = { productsList: () => this.htmlContainer.getElementsByClassName(GroceryShelf.classes.product) }
        // this.activateButtons();
    }

    list = () => [...this.html.productsList()].map((htmlContainer) => new Product(htmlContainer));

    activateButtons = () => this.list().forEach((product) => product.handlers.start());

    deactivateButtons = () => this.list().forEach((product) => product.handlers.stop());

}

class GroceryCart {
    static classes = {
        title: 'cart__title',
        products: 'cart__products',
        product: 'cart__product',
        img: 'cart__product-image',
        count: 'cart__product-count'
    }

    constructor(htmlContainer = document.body.querySelector(`.cart`)) {
        this.className = 'cart';
        this.htmlContainer = htmlContainer.closest(`.${this.className}`);
        this.html = {
            title: this.htmlContainer.querySelector(`.${GroceryCart.classes.title}`),
            products: this.htmlContainer.querySelector(`.${GroceryCart.classes.products}`),
            productsList: () => this.htmlContainer.getElementsByClassName(GroceryCart.classes.product),
            productsTemplate: (id, img, count) => `
            <div class=${GroceryCart.classes.product} data-id=${id}>
                <img class=${GroceryCart.classes.img} src=${img} alt="">
                <div class=${GroceryCart.classes.count}>${count}</div>
            </div>`
        }
        this.name = this.html.title ? this.html.title.textContent : null;
    }

    list = () => [...this.html.productsList()].map( (htmlContainer) => new CartProduct(htmlContainer) );

    add = (product) => {
        const cartProduct = this.list().find(cartProduct => cartProduct.id === product.id);
        if (cartProduct) {
            cartProduct.html.value.textContent = cartProduct.quantity() + product.quantity();
        } else {
            this.html.products.insertAdjacentHTML('beforeend',
                this.html.productsTemplate(product.id, product.img, product.quantity()));
        }
    }

    del = (product) => {
        const cartProduct = this.list().find(cartProduct => cartProduct.id === product.id);
        if (cartProduct) {
            if (cartProduct.quantity() > 1) {  //    Уменьшить кол-во продукта в Корзине
                cartProduct.html.value.textContent = cartProduct.quantity() - 1;
            } else {  //    Удалить продукт из Корзины
                cartProduct.htmlContainer.remove();
            }
        }
    }
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

function setCartEventHandlers(store = new GroceryStore()) {
    let handlers = { store: store }

    handlers.clickOnButtonAdd = (event) => {
        const product = new Product(event.target);
        new GroceryCart().add(product);
        product.html.value.textContent = 1;
    }

    handlers.clickOnButtonDec = (event) => {
        const  product = new Product(event.target);
        if (product.quantity() > 1) {
            product.html.value.textContent = product.quantity() - 1;
        } else {  //    Уменьшить кол-во продукта в Корзине / Удалить продукт из Корзины
            new GroceryCart().del(product);
        }
    }

    handlers.clickOnButtonInc = (event) => {
        const product = new Product(event.target);
        if (product.quantity() < 100) {
            product.html.value.textContent = product.quantity() + 1;
        }
    }

    return handlers;
}

function setEventHandlers() {
    let handlers = {};
    handlers.cart = setCartEventHandlers(myStore);
    return handlers;
}

function startHandlers() {
    myStore.shelves.forEach((shelf) => shelf.activateButtons());
}

function stopHandlers() {
    myStore.shelves.forEach((shelf) => shelf.deactivateButtons());
}


let myStore = new GroceryStore(),
    myHandlers = setEventHandlers();

startHandlers();

