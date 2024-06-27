//home.vue

<template>
  <div class="relative pb-40">
    <ToolBar class='fixed bottom-0 z-30' />
    <Header class="z-20" />
    <Catalogo :selectedCategory="selectedCategory" @adicionarAoCarrinho="adicionarAoCarrinho" />
    <BackTop />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

import Header from '../components/header/Header.vue';
import Catalogo from '../components/catalogo/Catalogo.vue';
import ToolBar from '../components/toolbar/ToolBar.vue';
import BackTop from '../components/backTop/BackTop.vue';

const selectedCategory = ref('Todos');

const store = useStore();
const router = useRouter();

const updateCategory = (categoria) => {
  selectedCategory.value = categoria;
};

window.addEventListener('category-selected', (event) => {
  updateCategory(event.detail);
});

const adicionarAoCarrinho = ({ nomeProduto, valorTotal }) => {
  store.dispatch('addToCart', { nomeProduto, valorTotal });
  router.push({ path: '/carrinho' });
};
</script>