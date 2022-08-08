import {makeAutoObservable} from "mobx";

export default class AboutProductStore {
    constructor() {
        this._product_types = []
        this._product_brands = []
        this._products = []
        this._selectedTypes = {}
        this._selectedBrands = {}
        this._page = 1
        this._totalCount = 0
        this._limit = 3
        makeAutoObservable(this)
    }

    setTypes(types) {
        this._product_types = types
    }
    setBrands(brands) {
        this._product_brands = brands
    }
    setProducts(products) {
        this._products = products
    }
    setSelectedTypes(types) {
        this.setPage(1)
        this._selectedTypes = types
    }
    setSelectedBrands(brands) {
        this.setPage(1)
        this._selectedBrands = brands
    }
    setPage(page) {
        this._page = page
    }
    setTotalCount(count) {
        this._totalCount = count
    }

    get types() {
        return this._product_types
    }
    get brands() {
        return this._product_brands
    }
    get products() {
        return this._products
    }
    get selectedTypes() {
        return this._selectedTypes
    }
    get selectedBrands() {
        return this._selectedBrands
    }
    get totalCount() {
        return this._totalCount
    }
    get page() {
        return this._page
    }
    get limit() {
        return this._limit
    }

}