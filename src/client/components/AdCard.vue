<script setup>
import { StarIcon } from '@heroicons/vue/outline';
</script>

<template>
  <div class="flex-col drop-shadow-lg rounded-lg lg:w-[440px] w-auto relative">
    <img
      src="https://picsum.photos/600/400/?random"
      class="rounded-lg w-full h-[220px]"
      loading="lazy" />
    <div
      class="absolute bottom-0 flex items-center justify-between bg-[#00000099] w-full text-white rounded-b-lg p-3">
      <div>
        <span>Check it out</span>
        <p class="p-1 opacity-80 text-xs text-gray">
          Please take a word from our sponsors
        </p>
      </div>
      <div
        class="bg-[#ff4081] rounded-full p-1 h-14 w-14 absolute flex justify-center items-center top-[-30px] right-3 cursor-pointer">
        <StarIcon class="h-8 w-8" />
      </div>
    </div>
  </div>
</template>
