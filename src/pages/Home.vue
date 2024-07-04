//home.vue

<template>
  <div class="relative pb-40 mx-auto">
    <ToolBar class="fixed bottom-0 z-30" />
    <Header class="z-20" />
    <Catalogo
      v-if="currentLayout === 'layout1'"
      :selectedCategory="selectedCategory"
      @adicionarAoCarrinho="adicionarAoCarrinho"
    />
    <Catalogo2
      v-if="currentLayout === 'layout2'"
      :selectedCategory="selectedCategory"
      @adicionarAoCarrinho="adicionarAoCarrinho"
    />
    <BackTop />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import Header from "../components/home/header/Header.vue";
import Catalogo from "../components/home/catalogo/Catalogo.vue";
import Catalogo2 from "../components/home/catalogo/Catalogo2.vue";
import ToolBar from "../components/ToolBar.vue";
import BackTop from "../components/BackTop.vue";

const selectedCategory = ref("Todos");
const currentLayout = ref("layout1");

const store = useStore();
const router = useRouter();

const updateCategory = (categoria) => {
  selectedCategory.value = categoria;
};

window.addEventListener("category-selected", (event) => {
  updateCategory(event.detail);
});

window.addEventListener("layout-changed", (event) => {
  currentLayout.value = event.detail;
});

const adicionarAoCarrinho = ({
  nomeProduto,
  valorTotal,
  codigoProduto,
  quantidadePorTamanho,
}) => {
  store.dispatch("addToCart", {
    nomeProduto,
    valorUnitario,
    valorTotal,
    codigoProduto,
    quantidadePorTamanho,
  });
  router.push({ path: "/carrinho" });
};
</script>
