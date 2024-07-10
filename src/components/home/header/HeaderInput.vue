<template>
  <div
    :class="[
      { 'pt-20': isSticky },
      'my-3 mx-auto flex items-center gap-2 z-50 max-w-screen-2xl',
    ]"
  >
    <div class="w-4/5 px-2">
      <label class="input input-bordered flex items-center gap-2 mr-auto">
        <Search class="text-gray-400 size-5" />
        <input
          type="text"
          class="grow"
          placeholder="Pesquisar"
          :value="searchQuery"
          @input="handleSearchInput($event.target.value)"
        />
      </label>
    </div>
    <div class="flex items-center justify-center mx-auto">
      <button @click="toggleSideFilter">
        <ListFilter />
      </button>
    </div>
  </div>
</template>

<script setup>
import { Search, ListFilter } from "lucide-vue-next";
import { ref, watch } from "vue";

const props = defineProps({
  searchQuery: {
    type: String,
    default: "",
  },
  isSticky: {
    type: Boolean,
    default: false,
  },
  toggleSideFilter: {
    type: Function, 
    required: true, 
  },
  handleSearchInput: {
    type: Function, 
    required: true, 
  },
});
</script>
