<template>
    <div>
        <h2>Carrinho de Compras</h2>
        <ul>
            <li v-for="(item, index) in carrinho" :key="index">
                <p>Nome do Produto: {{ item.nomeProduto }}</p>
                <p>Valor Total: R$ {{ item.valorTotal }}</p>
                <button @click="removerDoCarrinho(index)" class="text-red-600">Remover</button>
            </li>
        </ul>

        <router-link to="/" class="text-blue-600 mt-5 text-3xl">
            Voltar para a página inicial
        </router-link>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const carrinho = computed(() => store.getters.cartItems);

const removerDoCarrinho = (index) => {
  store.dispatch('removeFromCart', index);
};
</script>
