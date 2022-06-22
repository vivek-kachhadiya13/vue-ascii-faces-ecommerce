import { reactive } from 'vue';

import { products } from '@stores/products';

export const cart = reactive({
  items: [],
  isShow: false,
  totalAmount: 0,
  toggle() {
    this.isShow = !this.isShow;
  },
  totalItems() {
    return this.items.length;
  },
  addProduct(id) {
    const product = products.items.find((product) => product.id === id);
    const cartItem = this.items.find((item) => item.id === product.id);

    // If : item found in cart increase qty and total
    // Else: add new item in cart
    if (cartItem) {
      cartItem.qty += 1;
      cartItem.total += product.price;
    } else {
      this.items.push({ ...product, qty: 1, total: product.price });
    }
    // increase cart total amount
    this.totalAmount += product.price;
  },
  removeProduct(id) {
    const cartItem = this.items.find((item) => item.id === id);

    // decrease cart total amount
    this.totalAmount -= cartItem.price;

    // If : item found in cart decrease qty and total
    // Else: remove item from cart
    if (cartItem.qty > 1) {
      cartItem.qty -= 1;
      cartItem.total -= cartItem.price;
    } else {
      this.items = this.items.filter((item) => item.id != id);
    }
  },
});
