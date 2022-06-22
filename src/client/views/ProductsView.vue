<script>
import { debounce } from 'throttle-debounce';

import { ref, onMounted, onUnmounted } from 'vue';

import checkScroll from '@utils/check-scroll';
import { FETCH_SCROLL_THRESHOLD } from '@constants/index';

import { products } from '@stores/products';

import ProductCard from '@components/ProductCard.vue';
import LoadingCard from '@components/LoadingCard.vue';
import EndOfCatalogueCard from '@components/EndOfCatalogueCard.vue';

export default {
  components: {
    ProductCard,
    LoadingCard,
    EndOfCatalogueCard,
  },
  setup() {
    // State
    const layoutContent = ref();

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
      if (products.isLoading) {
        return;
      }
      // when reached the fetch threshold
      if (checkScroll(FETCH_SCROLL_THRESHOLD, layoutContent.value)) {
        // fetch API for entities
        getProductList();
      }
    });

    // Get Product List
    async function getProductList() {
      // Prevent from fetching data on scroll if it is EndOfCatalogue
      await products.fetch();
    }

    return {
      products,
    };
  },
};
</script>

<template>
  <Transition name="slide-fade">
    <div class="p-10 grid grid-cols-1 lg:grid-cols-3 gap-5">
      <ProductCard
        v-for="(product, index) in products.items"
        :key="product.id"
        :index="index"
        :product="product" />
    </div>
  </Transition>
  <div class="flex justify-center items-center">
    <LoadingCard v-if="products.isLoading" />
    <EndOfCatalogueCard v-if="products.isEndOfCatalogue" />
  </div>
</template>
