<script setup>
import { ref, watch } from 'vue';
import { products } from '@stores/products';

import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue';
import { CheckIcon, MenuAlt2Icon } from '@heroicons/vue/solid';

const productFilters = [
  { name: 'Id', value: 'id' },
  { name: 'Size', value: 'size' },
  { name: 'Price', value: 'price' },
];
const selectedProductFilter = ref(productFilters[0].value);

watch(selectedProductFilter, async (newVal) => {
  products.resetState();
  products.sortBy = newVal;
  await products.fetch();
});

</script>

<template>
  <Listbox v-model="selectedProductFilter" class="pr-5">
    <div class="relative">
      <ListboxButton>
        <div class="md:w-6 md:h-6 w-5 h-5 rounded-full text-2xl mr-3 mt-1">
          <MenuAlt2Icon />
        </div>
      </ListboxButton>
      <transition
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0">
        <ListboxOptions
          class="absolute top-12 max-h-60 w-auto overflow-auto rounded-md bg-white py-1 text-base shadow-lg right-9 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          <ListboxOption
            v-slot="{ active, selected }"
            v-for="productFilter in productFilters"
            :key="productFilter.name"
            :value="productFilter.value"
            as="template">
            <li
              :class="[
                active ? 'bg-amber-100 text-amber-900' : 'text-gray-900',
                'relative cursor-default select-none py-2 pl-10 pr-4',
              ]">
              <span
                :class="[
                  selected ? 'font-medium' : 'font-normal',
                  'block truncate',
                ]"
                >{{ productFilter.name }}</span
              >
              <span
                v-if="selected"
                class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                <CheckIcon class="h-5 w-5" aria-hidden="true" />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>
