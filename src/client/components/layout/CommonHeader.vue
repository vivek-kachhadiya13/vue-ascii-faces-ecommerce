<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import { ShoppingCartIcon } from '@heroicons/vue/solid';

import ProductFilters from '@components/ProductFilters.vue';

const route = useRoute();

const isShowProductFilter = computed(() => {
  return route.path === '/products';
});
</script>

<template>
  <header class="sticky top-0 w-screen bg-[#00bcd4] z-10">
    <div class="px-10">
      <nav class="flex relative items-center justify-between h-16 mt-0">
        <a class="flex items-center whitespace-nowrap text-xl" href="/">
          <span class="mr-3">\{^_^}/</span>
          ascii faces ecommerce
        </a>
        <div class="flex items-center">
          <ProductFilters v-if="isShowProductFilter" />
          <button
            @click="toggleCartSidebar = !toggleCartSidebar"
            class="w-6 h-6 rounded-full text-2xl hover:bg-[#9e9e9e33]">
            <ShoppingCartIcon />
          </button>
        </div>
      </nav>
    </div>
  </header>
</template>
