<script setup>
import AdCard from '@components/AdCard.vue';
</script>

<template>
  <div class="flex justify-center">
    <div class="m-8">
      <div class="max-w-[800px] mb-10">
        <p class="text-base text-dark">
          Here you're sure to find a bargain on some of the finest ascii
          available to purchase. Be sure to peruse our selection of ascii faces
          in an exciting range of sizes and prices.
        </p>
        <p class="text-base mt-3 text-dark">
          But first, a word from our sponsors:
        </p>
      </div>
      <div class="flex flex-col justify-center items-center">
        <AdCard />
        <RouterLink to="/products">
          <button
            class="bg-dark text-light font-medium drop-shadow-1 m-8 min-w-[64px] h-9 px-4 text-sm uppercase mx-auto flex justify-center items-center">
            Let me shop!
          </button>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
