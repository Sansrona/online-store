import { makeAutoObservable } from "mobx";
import { ProductType, PromocodeType } from "../api/types";

type ProductInCartType = {
  product: ProductType;
  count: number;
};

class CartStore {
  cart: ProductInCartType[] = [];
  ids: number[] = [];
  discount: PromocodeType[] = [];

  constructor() {
    let storagePromos = localStorage.getItem("promos");
    if (storagePromos) this.discount = JSON.parse(storagePromos) || [];
    makeAutoObservable(this);
  }

  get productsCountInCart() {
    return this.cart.reduce((total, product) => total + product.count, 0);
  }

  get discountList() {
    return this.discount;
  }

  get productsPriceInCart() {
    return this.cart.reduce(
      (sum, item) => sum + item.product.price * item.count,
      0
    );
  }

  get priceWithDiscount() {
    const discount = this.discount.reduce((sum, promo) => sum + promo.value, 0);
    if (discount > 0) {
      return ((1 - discount / 100) * this.productsPriceInCart).toFixed(2);
    }
    return 0;
  }

  get itemsInCartIds() {
    return this.cart.map((item) => item.product.id);
  }

  setCartFromStorage = () => {
    let cart = localStorage.getItem("cart");
    if (cart) this.cart = JSON.parse(cart);
  };

  setIdsFromStorage = () => {
    let ids = localStorage.getItem("ids");
    if (ids) this.ids = JSON.parse(ids);
  };

  addProductToCart = (product: ProductType) => {
    let newItem: ProductInCartType = {
      product,
      count: 1,
    };
    this.cart.push(newItem);
    this.ids.push(product.id);
    localStorage.setItem("cart", JSON.stringify(this.cart));
    localStorage.setItem("ids", JSON.stringify(this.ids));
  };

  removeProductFromCart = (productId: number) => {
    this.cart = this.cart.filter((p) => p.product.id !== productId);
    this.ids = this.ids.filter((p) => p !== productId);
    localStorage.setItem("cart", JSON.stringify(this.cart));
    localStorage.setItem("ids", JSON.stringify(this.ids));
  };

  incrementProductCount = (productId: number) => {
    let product = this.cart.find((p) => p.product.id === productId);
    if (product && product.count < product.product.stock) {
      product.count += 1;
    }
    localStorage.setItem("cart", JSON.stringify(this.cart));
  };

  decrementProductCount = (productId: number) => {
    let product = this.cart.find((p) => p.product.id === productId);
    if (product && product.count > 0) {
      product.count -= 1;
    }
    if (product?.count === 0) {
      this.removeProductFromCart(productId);
    }
    localStorage.setItem("cart", JSON.stringify(this.cart));
  };

  setPromo = (promo: PromocodeType) => {
    this.discount.push(promo);
    localStorage.setItem("promos", JSON.stringify(this.discount));
  };

  dropPromo = (promoName: string) => {
    this.discount = this.discount.filter((promo) => promo.name !== promoName);
    localStorage.setItem("promos", JSON.stringify(this.discount));
  };
}

export default new CartStore();
