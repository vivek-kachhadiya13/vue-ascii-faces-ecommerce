<script setup>
import { cart } from '@stores/cart';

import { ShoppingCartIcon, MinusCircleIcon } from '@heroicons/vue/solid';

import { fromCents } from '@utils/money';
</script>
<template>
  <div
    class="md:w-6 md:h-6 w-5 h-5 rounded-full text-2xl relative cursor-pointer"
    @click="cart.toggle()">
    <ShoppingCartIcon />
    <span
      className="absolute top-[-13px] right-[-14px] w-5 h-5 bg-[#ff4081] rounded-full text-xs font-bold text-white flex items-center justify-center"
      v-if="cart.totalItems()">
      {{ cart.totalItems() }}
    </span>
  </div>
  <div
    v-if="cart.isShow"
    @click="cart.toggle()"
    class="absolute top-0 w-screen bg-[#00000080] right-0 h-[100vh] z-50" />

  <div
    class="absolute top-0 w-[380px] bg-white right-[-41px] h-[100vh] z-50"
    v-if="cart.isShow">
    <div
      class="text-center text-sm h-16 whitespace-nowrap flex flex-col text-[#424242] p-6">
      <div class="flex items-center">
        <div class="w-6 h-6 mr-2">
          <ShoppingCartIcon />
        </div>
        <span class="text-xl">Shopping Cart</span>
      </div>
      <div class="py-6 flex items-center h-16">
        <span class="text-xs uppercase text-[#0000008a]">
          {{ cart.totalItems() ? 'Products' : 'NO ITEMS ADDED YET (ಠ_ಠ)' }}
        </span>
      </div>
      <div
        v-for="item in cart.items"
        :key="item.id"
        :value="item.id"
        class="text-[#757575] h-16 whitespace-nowrap flex items-center text-base uppercase font-normal justify-between mb-3">
        <div class="flex items-center">
          <div
            class="w-6 h-6 cursor-pointer"
            @click="cart.removeProduct(item.id)">
            <MinusCircleIcon />
          </div>
          <div class="pl-5">
            <p class="text-base text-black text-left">{{ item.face }}</p>
            <p class="text-xs">
              Size: {{ item.size }} - Qty: {{ item.qty }} - Each: $
              {{ fromCents(item.price) }}
            </p>
          </div>
        </div>
        <div>
          <span class="text-[#757575] font-medium text-sm">Total</span>
          <p class="text-[#ff4081] font-medium">
            $ {{ fromCents(item.total) }}
          </p>
        </div>
      </div>
      <div
        class="text-center h-12 whitespace-nowrap flex justify-between items-center text-xl uppercase font-normal mt-3">
        <span>Total</span>
        <span class="text-[#ff4081] font-medium"
          >$ {{ fromCents(cart.totalAmount) }}</span
        >
      </div>
    </div>
  </div>
</template>
