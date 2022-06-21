<script>
import { StarIcon } from '@heroicons/vue/outline';

import { ref } from 'vue';

import { API_URL, ADS_URL } from '@constants/index';

export default {
  components: {
    StarIcon,
  },
  setup() {
    // State
    const addURL = ref(
      `${API_URL}${ADS_URL}${parseInt(Date.now() * Math.random())}`
    );

    return {
      addURL,
    };
  },
};
</script>

<template>
  <div class="flex-col drop-shadow-lg rounded-lg lg:w-[440px] w-auto relative">
    <div class="bg-slate-100 lg:w-[440px] w-auto">
      <img
        :src="addURL"
        loading="lazy"
        class="rounded-lg w-full h-56"
        alt="picsum photo" />
    </div>
    <div
      class="absolute bottom-0 flex items-center justify-between bg-[#00000099] w-full text-white rounded-b-lg p-3">
      <div>
        <span>Check it out</span>
        <p class="p-1 opacity-80 text-xs text-gray">
          Please take a word from our sponsors
        </p>
      </div>
      <a
        href="https://unsplash.it"
        target="_blank"
        class="bg-[#ff4081] rounded-full p-1 h-14 w-14 absolute flex justify-center items-center top-[-30px] right-3 cursor-pointer">
        <StarIcon class="h-8 w-8" />
      </a>
    </div>
  </div>
</template>
