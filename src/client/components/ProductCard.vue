<script setup>
import { computed } from 'vue';
import { ShoppingCartIcon } from '@heroicons/vue/outline';

import { fromCents } from '@utils/money';
import { fromNow } from '@utils/timestamp';

import { cart } from '@stores/cart';

import AdCard from '@components/AdCard.vue';

const props = defineProps({
  product: Object,
  index: Number,
});

const isShowAd = computed(() => {
  return (props.index + 1) % 20 === 0;
});
</script>

<template>
  <div class="flex-col drop-shadow-lg rounded-lg lg:w-[440px] w-auto relative">
    <div
      class="rounded-lg w-full h-[220px] flex justify-center pt-[60px] bg-slate-50">
      <p :style="{ fontSize: `${product.size}px` }">
        {{ product.face }}
      </p>
    </div>
    <div
      class="absolute bottom-0 flex items-center justify-between bg-[#b2eaf2] w-full text-white rounded-b-lg p-3">
      <div>
        <span class="p-1 text-lg text-black font-bold opacity-70"
          >${{ fromCents(product.price) }}</span
        >
        <p class="p-1 text-sm text-gray-700 opacity-70">
          {{ fromNow(product.date) }}
        </p>
      </div>
      <div
        class="bg-[#ff4081] rounded-full p-1 h-14 w-14 absolute flex justify-center items-center top-[-30px] right-3 cursor-pointer" @click="cart.addProduct(product.id)">
        <ShoppingCartIcon class="h-8 w-8" />
      </div>
    </div>
  </div>
  <AdCard :key="`ad_${index}`" v-if="isShowAd" />
</template>
