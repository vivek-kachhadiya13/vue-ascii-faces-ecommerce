<script>
// import a Fetch Polyfill to use for API calls
import fetch from 'isomorphic-fetch';
import { debounce } from 'throttle-debounce';

import { ref, onMounted, onUnmounted } from 'vue';
import ProductCard from '@components/ProductCard.vue';
import LoadingCard from '@components/LoadingCard.vue';
import EndOfCatalogueCard from '@components/EndOfCatalogueCard.vue';

import {
  API_URL,
  FETCH_LIMIT,
  PRODUCTS_ENTITY,
  FETCH_SCROLL_THRESHOLD,
} from '@constants/index';
import checkScroll from '@utils/check-scroll';

export default {
  components: {
    ProductCard,
    LoadingCard,
    EndOfCatalogueCard,
  },
  setup() {
    // State
    const products = ref([]);
    const loading = ref(true);
    const layoutContent = ref();
    const currentPage = ref(1);
    const isEndOfCatalogue = ref(false);

    /**
     * Handle event when component will mount
     */
    onMounted(() => {
      getProductList();

      // save mdl layout content
      layoutContent.value = document.querySelector('.layout__content');

      // add event listener to scroll
      window.addEventListener('scroll', handleScroll);
    });

    /**
     * Handle event when component will unmount
     */
    onUnmounted(() => {
      // remove event listener from scroll
      window.removeEventListener('scroll', handleScroll);
    });

    /**
     * Handle scroll event to add pre fetched entities to the grid
     * when a threshold is reached and also to pre fetch next entities.
     */
    let handleScroll = debounce(100, () => {
      // return if is fetching or is at end, no need to fetch again
      if (loading.value) {
        return;
      }
      // when reached the fetch threshold
      if (checkScroll(FETCH_SCROLL_THRESHOLD, layoutContent.value)) {
        // fetch API for entities
        currentPage.value += 1;
        getProductList();
      }
    });

    // Get Product List
    async function getProductList() {
      // Prevent from fetching data on scroll if it is EndOfCatalogue
      if (isEndOfCatalogue.value) return;

      loading.value = true;

      const productsList = await fetch(
        `${API_URL}/${PRODUCTS_ENTITY}?_page=${currentPage.value}&_limit=${FETCH_LIMIT}&_sort=id`
      ).then((response) => response.json());

      isEndOfCatalogue.value = !productsList.length;

      products.value = [...products.value, ...productsList];

      loading.value = false;
    }
    return {
      products,
      loading,
      isEndOfCatalogue,
    };
  },
};
</script>

<template>
  <Transition name="slide-fade">
    <div class="p-10 grid grid-cols-1 lg:grid-cols-3 gap-5">
      <ProductCard
        v-for="(product, index) in products"
        :key="product.id"
        :index="index"
        :product="product" />
    </div>
  </Transition>
  <div class="flex justify-center items-center">
    <LoadingCard v-if="loading" />
    <EndOfCatalogueCard v-if="isEndOfCatalogue" />
  </div>
</template>
