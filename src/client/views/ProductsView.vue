<script>
// import a Fetch Polyfill to use for API calls
import fetch from 'isomorphic-fetch';

import { ref, onMounted } from 'vue';
import ProductCard from '@components/ProductCard.vue';
import LoadingCard from '@components/LoadingCard.vue';

import { API_URL, FETCH_LIMIT, PRODUCTS_ENTITY } from '@constants/index';

export default {
  components: {
    ProductCard,
    LoadingCard,
  },
  setup() {
    // State
    const products = ref([]);
    const loading = ref(true);

    // Hooks
    onMounted(() => {
      getProductList();
    });

    // Get Product List
    async function getProductList() {
      products.value = await fetch(
        `${API_URL}/${PRODUCTS_ENTITY}?_page=1&_limit=${FETCH_LIMIT}&_sort=id`
      ).then((response) => response.json());
      loading.value = false;
    }

    return {
      products,
      loading,
    };
  },
};
</script>

<template>
  <LoadingCard v-if="loading" />
  <Transition name="slide-fade">
    <div class="p-10 grid grid-cols-1 lg:grid-cols-3 gap-5" v-if="!loading">
      <ProductCard
        v-for="(product, index) in products"
        :key="product.id"
        :index="index"
        :product="product" />
    </div>
  </Transition>
</template>
