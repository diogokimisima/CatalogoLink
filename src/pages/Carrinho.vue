<template>
    <div class="flex flex-col justify-center items-center">
        <h1 class="text-3xl font-bold mb-4">Carrinho de Compras</h1>

        <ul>
            <li v-for="(item, index) in carrinho" :key="index" class="border-b border-gray-200 mb-4 pb-4">
                <div class="flex flex-col items-startr">
                    <div class="flex flex-row items-center justify-between">
                        <h2 class="font-bold text-lg"> {{ item.nomeProduto }}</h2>
                        <button @click="removerDoCarrinho(index)"
                            class="text-red-600 mt-4 px-3 py-1 border border-red-600 rounded hover:bg-red-600 hover:text-white transition duration-300">
                            Remover
                        </button>
                    </div>
                    <div class="flex items-center">
                        <img :src="item.imagem" :alt="'Imagem ' + index" class="w-24 h-24 object-contain mr-4">
                        <div>
                            <p class="text-gray-600">{{ item.codigoProduto }}</p>
                            <p class="font-semibold">Cor: {{ item.cor }}</p>
                            <p class="font-semibold">Valor Total: R$ {{ item.valorTotal.toFixed(2) }}</p>
                        </div>
                    </div>
                </div>

                <div class="flex gap-4 items-">
                    <ul v-for="(quantidade, tamanho) in item.quantidadePorTamanho" :key="tamanho" class="mt-2 ">
                        <li class="text-gray-600">
                            {{ tamanho }}
                        </li>
                        <li>{{ quantidade }} </li>
                    </ul>
                </div>


            </li>
        </ul>

        <router-link to="/" class="text-blue-600 mt-5 block text-xl">
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
