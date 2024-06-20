<template>
  <div class="relative bg-slate-100">
    <ToolBar class='fixed bottom-0 z-50' />
    <Header :selectedCategory="selectedCategory" />
    <Catalogo :selectedCategory="selectedCategory" />
  </div>
</template>

<script setup>
import Header from '../components/header/Header.vue'
import Catalogo from '../components/catalogo/Catalogo.vue'
import ToolBar from '../components/toolbar/ToolBar.vue'

import { ref } from 'vue';

const selectedCategory = ref('Todos');
</script>