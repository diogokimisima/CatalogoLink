//home.vue

<template>
  <div class="relative pb-40">
    <ToolBar class='fixed bottom-0 z-50' />
    <Header />
    <Catalogo :selectedCategory="selectedCategory" />
    <BackTop />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Header from '../components/header/Header.vue';
import Catalogo from '../components/catalogo/Catalogo.vue';
import ToolBar from '../components/toolbar/ToolBar.vue';
import BackTop from '../components/backTop/BackTop.vue';

const selectedCategory = ref('Todos');

const updateCategory = (categoria) => {
  selectedCategory.value = categoria;
};

window.addEventListener('category-selected', (event) => {
  updateCategory(event.detail);
});
</script>