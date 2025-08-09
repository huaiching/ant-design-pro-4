import { makeAutoObservable } from 'mobx'

// ProductInfo
export interface ProductInfo {
    id: number
    title: string // 商品名稱
    price: number // 商品價格
}

class ProductInfoStore {
    productInfo: ProductInfo = {
        id: 0,
        title: '',
        price: 0,
    }

    constructor() {
        makeAutoObservable(this)
    }

    // 初始化方法
    initProductInfo() {
        this.productInfo = {
            id: 0,
            title: '',
            price: 0,
        }
    }

    // set 整筆
    setProductInfo(data: ProductInfo) {
        this.productInfo = data
    }

    // get 整筆
    get getProductInfo() {
        return this.productInfo
    }

    // set id
    setId(id: number) {
        this.productInfo.id = id
    }

    // get id
    get getId() {
        return this.productInfo.id
    }

    // set 商品名稱
    setTitle(title: string) {
        this.productInfo.title = title
    }

    // get 商品名稱
    get getTitle() {
        return this.productInfo.title
    }

    // set 商品價格
    setPrice(price: number) {
        this.productInfo.price = price
    }

    // get 商品價格
    get getPrice() {
        return this.productInfo.price
    }

}
const productInfoStore = new ProductInfoStore()
export default productInfoStore
