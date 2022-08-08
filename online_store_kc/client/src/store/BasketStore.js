import {makeAutoObservable} from "mobx";
import {deleteProductFromBasket} from "../http/aboutProductAPI";

export default class BasketStore {
    constructor() {
        this._totalPrice = 0;
        this._basket = [];
        makeAutoObservable(this);
    }

    async setDeleteItemBasket(about_product, isAuthorization = false) {
        if(isAuthorization) {
            await deleteProductFromBasket(about_product.id).then(() => {
                this._basket = this._basket.filter(item => item.id !== about_product.id);
                this._totalPrice -=  about_product.price * about_product.count;
            });
        } else {
            this._basket = this._basket.filter(item => item.id !== about_product.id);
            this._totalPrice -=  about_product.price * about_product.count;

            localStorage.setItem("basket", JSON.stringify(this._basket));
        }
    }

    setBasket(item, isAuthorization = false) {
        const checkProductInBasket = this._basket.findIndex(about_product => about_product.id === item.id);
        if(checkProductInBasket < 0) {
            this._basket = [...this._basket, { count: 1, ...item}];
            let totalPrice = 0;
            this._basket.forEach(about_product => totalPrice += Number(about_product.price * about_product.count));
            this._totalPrice = totalPrice;
        }

        if(!isAuthorization) {
            localStorage.setItem("basket", JSON.stringify(this._basket));
        }
    }

    setDeleteAllProductFromBasket() {
        this._totalPrice = 0;
        return this._basket = [];
    }

    setCountProduct(productId, action, isAuthorization = false) {
        const itemInd = this._basket.findIndex(item => item.id === productId);
        const itemInState = this._basket.find(about_product => about_product.id === productId);
        if (action === "+") {
            const newItem = {
                ...itemInState,
                count: ++itemInState.count
            }
            this._basket = [...this._basket.slice(0, itemInd), newItem, ...this._basket.slice(itemInd + 1)]
        } else {
            const newItem = {
                ...itemInState,
                count: itemInState.count === 1 ? 1 : --itemInState.count
            }
            this._basket = [...this._basket.slice(0, itemInd), newItem, ...this._basket.slice(itemInd + 1)]
        }

        if(!isAuthorization) {
            localStorage.setItem("basket", JSON.stringify(this._basket));
        }

        let totalPrice = 0;
        this._basket.forEach(about_product => totalPrice += Number(about_product.price * about_product.count));
        this._totalPrice = totalPrice;
    }

    resetBasket() {
        this._basket = [];
        this._totalPrice = 0;
        localStorage.removeItem('basket');
    }


    get Basket() {
        return this._basket;
    }

    get Price() {
        return this._totalPrice;
    }
}


