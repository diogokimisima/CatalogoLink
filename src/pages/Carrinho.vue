<template>
    <transition name="fade">
        <ToastSuccess v-if="showToast" message="Produto excluído com sucesso" />
    </transition>

    <header>
        <div role="tablist" class="tabs tabs-bordered h-10">
            <a role="tab" class="tab tab-active">1 Carrinho</a>
            <a role="tab" class="tab">2 Dados do pedido</a>
            <a role="tab" class="tab">3 Fechar Pedido</a>
        </div>
    </header>

    <div class="flex flex-col justify-center items-center">
        <div v-if="carrinho.length === 0" class="flex flex-col items-center justify-center h-lvh">
            <h1 class="font-semibold">SEU CARRINHO ESTÁ VAZIO</h1>

            <router-link to="/" class="text-blue-600 mt-5 block text-xl">
                Voltar para o catalogo
            </router-link>
        </div>

        <ul class="mt-5">
            <li v-for="(item, index) in carrinho" :key="index" class="border-b border-gray-00 mb-4 pb-4">
                <div class="flex flex-col">
                    <div class="flex flex-row items-center justify-between">
                        <h2 class="font-bold text-lg"> {{ item.nomeProduto }}</h2>
                        <button onclick="my_modal_2.showModal()">
                            <Trash2 />
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

                <dialog id="my_modal_2" class="modal">
                    <div class="modal-box">
                        <h3 class="text-lg font-bold">Confirmação de exclusão</h3>
                        <p class="py-4">Deseja excluir o produto {{ item.nomeProduto }}</p>
                        <form method="dialog" class="mt-5">
                            <div class="flex ">
                                <button class="bg-black  bg-opacity-10 p-2 rounded-md"
                                    @click="removerDoCarrinho(index)">Confirmar</button>
                                <button class="ml-auto bg-black bg-opacity-10 p-2 rounded-md">Cancelar</button>
                            </div>
                        </form>
                    </div>
                </dialog>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { Trash2 } from 'lucide-vue-next';

import ToastSuccess from '../components/toasts/ToastSuccess.vue';

const showToast = ref(false);

const store = useStore();

const carrinho = computed(() => store.getters.cartItems);

const removerDoCarrinho = (index) => {
    store.dispatch('removeFromCart', index);

    showToast.value = true;
    setTimeout(() => {
        showToast.value = false;
    }, 2000);
};
</script>
