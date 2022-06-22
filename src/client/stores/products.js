import { reactive } from 'vue';
import fetch from 'isomorphic-fetch';

import { API_URL, FETCH_LIMIT, PRODUCTS_ENTITY } from '@constants/index';

export const products = reactive({
  items: [],
  page: 1,
  sortBy: 'id',
  isLoading: false,
  isEndOfCatalogue: false,

  async fetch() {
    // Prevent from fetching data on scroll if it is EndOfCatalogue
    if (this.isEndOfCatalogue) return;

    this.isLoading = !this.isLoading;

    const productsList = await fetch(
      `${API_URL}/${PRODUCTS_ENTITY}?_page=${this.page}&_limit=${FETCH_LIMIT}&_sort=${this.sortBy}`
    ).then((response) => response.json());

    this.isEndOfCatalogue = !productsList.length;

    this.items = [...this.items, ...productsList];

    this.page += 1;

    this.isLoading = !this.isLoading;
  },

  resetState() {
    this.page = 1;
    this.items = [];
  },
});
