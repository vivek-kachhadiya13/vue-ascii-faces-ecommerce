<script setup>
import { RouterView } from 'vue-router';

import CommonHeader from '@components/layout/CommonHeader.vue';
</script>

<template>
  <CommonHeader />
  <main class="layout__content">
    <RouterView />
  </main>
</template>
