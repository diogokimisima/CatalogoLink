<template>
  <transition name="slide">
    <ToastSuccess class="z-50" v-if="showToast" message="Produto excluído com sucesso" />
  </transition>

  <header>
    <!-- <div role="tablist" class="tabs tabs-bordered h-10">
      <a role="tab" class="tab tab-active">1 Carrinho</a>
      <a role="tab" class="tab">2 Dados do pedido</a>
      <a role="tab" class="tab">3 Fechar Pedido</a>
    </div> -->

    <div role="tablist" class="tabs tabs-lifted p-4">
      <a role="tab" class="tab tab-active text-white [--tab-bg:#172554]">1 Carrinho</a>
      <a role="tab" class="tab"> 2 Dados do pedido </a>
      <a role="tab" class="tab">3 Fechar Pedido</a>
    </div>
  </header>

  <div class="flex flex-col justify-center items-center">
    <div
      v-if="carrinho.length === 0"
      class="flex flex-col items-center justify-center h-lvh"
    >
      <h1 class="font-semibold">SEU CARRINHO ESTÁ VAZIO</h1>

      <router-link to="/" class="text-blue-600 mt-5 block text-xl">
        Voltar para o catalogo
      </router-link>
    </div>

    <div>
      <h1>Subtotal: R$ {{ formatPrice(valorTotalCarrinho) }}</h1>
    </div>

    <ul class="mt-5 px-4 w-full">
      <li
        v-motion-fade-visible
        v-for="(item, index) in carrinho"
        :key="index"
        :class="[
          'border-b border-gray-00 mb-6 p-2 shadow-md shadow-neutral-400',
          index === carrinho.length - 1 ? 'mb-28' : '',
        ]"
      >
        <div class="flex flex-col">
          <div class="flex flex-row items-center justify-between">
            <h2 class="text-lg">
              <span class="font-bold"
                >{{ item.numeroItem }} - {{ item.nomeProduto }}</span
              >
              ({{ item.codigoProduto }})
            </h2>
            <button @click="showModal(item)">
              <Trash2 />
            </button>
          </div>
          <div class="flex items-center">
            <img
              :src="item.imagem"
              :alt="'Imagem ' + index"
              class="w-28 h-28 object-contain mr-4"
            />
            <div>
              <p><span class="font-semibold">Cor:</span> {{ item.cor }}</p>
              <p>
                <span class="font-semibold">Valor Unitário:</span> R$
                {{ formatPrice(item.valorUnitario) }}
              </p>
              <p>
                <span class="font-semibold">Valor Total:</span> R${{
                  formatPrice(item.valorTotal)
                }}
              </p>
            </div>
          </div>
        </div>

        <div class="flex items-center">
          <div class="flex gap-4 py-2 px-2 w-[80%] overflow-x-auto">
            <ul
              v-for="(quantidade, tamanho) in item.quantidadePorTamanho"
              :key="tamanho"
              class="flex flex-col items-center justify-center"
            >
              <li class="font-">
                {{ tamanho }}
              </li>
              <li class="py-0.5 px-3 bg-white shadow-md shadow-slate-500">
                {{ quantidade }}
              </li>
            </ul>
          </div>
          <div class="ml-auto py-2 pl-5 border-l-2 border-neutral-300">
            <p>Total</p>
            <p class="py-0.5 px-3 bg-white shadow-md shadow-slate-500">
              {{ somaQuantidade(item.quantidadePorTamanho) }}
            </p>
          </div>
        </div>

        
      </li>
    </ul>
  </div>

  <dialog ref="myModal" id="my_modal_2" class="modal">
          <div class="modal-box">
            <h3 class="text-lg font-bold">Confirmação de exclusão</h3>
            <p class="py-4">
              Confirma a exclusão do item {{ selectedItem?.numeroItem }} - {{ selectedItem?.nomeProduto}}?
            </p>
            <form method="dialog" class="mt-5">
              <div class="flex">
                <button
                  class="border-neutral-200 border p-2 rounded-md"
                  @click="removerDoCarrinho(index)"
                >
                  Confirmar
                </button>
                <button class="ml-auto border-neutral-200 border p-2 rounded-md">
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </dialog>
</template>

<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { Trash2 } from "lucide-vue-next";

import { formatPrice } from "../utils/formatarValores.js";
import ToastSuccess from "../components/toasts/ToastSuccess.vue";

const showToast = ref(false);
const selectedItem = ref(null);
const myModal = ref(null);
const store = useStore();

const carrinho = computed(() => store.getters.cartItems);

carrinho.value.forEach((item, index) => {
  item.numeroItem = index + 1;
});

const showModal = (item) => {
    selectedItem.value = item;
    myModal.value.showModal();
};

const somaQuantidade = (quantidadePorTamanho) => {
  return Object.values(quantidadePorTamanho).reduce(
    (total, quantidade) => total + quantidade,
    0
  );
};

const valorTotalCarrinho = computed(() => {
  return carrinho.value.reduce((total, item) => total + item.valorTotal, 0);
});

const removerDoCarrinho = (index) => {
  store.dispatch("removeFromCart", index);

  showToast.value = true;
  setTimeout(() => {
    showToast.value = false;
  }, 2000);
};
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s, opacity 0.5s;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.slide-enter-to,
.slide-leave-from {
  opacity: 1;
  transform: translateX(0);
}
</style>
