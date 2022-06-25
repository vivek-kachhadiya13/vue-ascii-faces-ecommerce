<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import CartSidebar from '@components/CartSidebar.vue';
import ProductFilters from '@components/ProductFilters.vue';

const route = useRoute();

const isShowProductFilter = computed(() => {
  return route.path === '/products';
});
</script>

<template>
  <header class="sticky top-0 w-screen bg-dark z-10">
    <div class="md:px-10 px-4">
      <nav class="flex relative items-center justify-between h-16 mt-0">
        <a
          class="flex items-center whitespace-nowrap md:text-xl text-md text-light"
          href="/">
          <span class="mr-3">\{^_^}/</span>
          ascii faces ecommerce
        </a>
        <div class="flex items-center">
          <ProductFilters v-if="isShowProductFilter" />
          <CartSidebar />
        </div>
      </nav>
    </div>
  </header>
</template>
