//home.vue

<template>
  <div class="relative pb-40">
    <ToolBar class="fixed bottom-0 z-30" />
    <Header class="z-20" />
    <Catalogoo
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

import Header from "../components/header/Header.vue";
import Catalogoo from "../components/catalogo/Catalogoo.vue";
import ToolBar from "../components/toolbar/ToolBar.vue";
import BackTop from "../components/backTop/BackTop.vue";

const selectedCategory = ref("Todos");

const store = useStore();
const router = useRouter();

const updateCategory = (categoria) => {
  selectedCategory.value = categoria;
};

window.addEventListener("category-selected", (event) => {
  updateCategory(event.detail);
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
