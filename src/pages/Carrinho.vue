<template>
  <transition name="slide">
    <ToastSuccess
      class="z-50"
      v-if="showToastSuccess"
      message="Produto excluído com sucesso"
    />
  </transition>

  <CarrinhoHeader />

  <div class="flex flex-col justify-center items-center">
    <CarrinhoVazio v-if="carrinho.length === 0" />
    <div class="px-4 w-full">
      <div v-if="carrinho.length !== 0" class="flex my-5">
        <h2 class="text-center bg-blue-950 text-white p-3 rounded-md">
          <span class="text-gray-400">Subtotal:</span> R${{
            formatPrice(valorTotalCarrinho)
          }}
        </h2>
        <button
          onclick="my_modal_3.showModal()"
          class="text-center bg-blue-950 text-white p-3 rounded-md ml-auto"
        >
          Finalizar
        </button>
      </div>

      <ul>
        <CarrinhoItens
          v-for="(item, index) in carrinho"
          :key="index"
          :item="item"
          :index="index"
          :isLastItem="index === carrinho.length - 1"
          :showModal="showModal"
          :somaQuantidade="somaQuantidade"
        />
      </ul>
    </div>
  </div>

  <!-- modal para excluir um item do carrinho -->
  <dialog ref="myModal" id="my_modal_2" class="modal">
    <div class="modal-box">
      <h3 class="text-lg font-bold">Confirmação de exclusão</h3>
      <p class="py-4">
        Confirma a exclusão do item
        <span class="font-bold"
          >{{ selectedItem?.numeroItem }} - {{ selectedItem?.nomeProduto }}?</span
        >
      </p>
      <form method="dialog" class="mt-5">
        <div class="flex">
          <button
            class="border-neutral-200 border p-2 rounded-md focus:outline-none"
            @click="removerDoCarrinho(index)"
          >
            Confirmar
          </button>
          <button class="ml-auto border-neutral-200 border p-2 rounded-md focus:outline-none">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  </dialog>

  <!-- modal para finalizar o carrinho -->
  <dialog id="my_modal_3" class="modal">
    <transition name="slide">
      <ToastError class="z-50" v-if="showToastError" :message="toastErrorMessage" />
    </transition>
    <div class="modal-box">
      <form method="dialog">
        <button
          class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 border-none focus:outline-none"
        >
          <X class="size-8" />
        </button>
      </form>
      <h3 class="text-lg font-bold">Finalização do carrinho</h3>
      <div class="flex flex-col gap-4 mt-5">
        <label class="input input-bordered flex items-center gap-2">
          <User />
          <input v-model="nome" type="text" class="grow" placeholder="Nome" />
        </label>
        <label class="input input-bordered flex items-center gap-2">
          <Mail />
          <input v-model="email" type="text" class="grow" placeholder="Email" />
        </label>
        <label class="input input-bordered flex items-center gap-2">
          <Phone />
          <MaskInput
            v-model="celular"
            type="text"
            mask="(##) #####-####"
            class="grow"
            placeholder="Celular: (99) 99999-9999"
          />
        </label>
        <button @click="confirmarCarrinho" class="bg-blue-950 text-white p-2 rounded-md">
          Confirmar
        </button>
      </div>
    </div>
  </dialog>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { X, User, Mail, Phone } from 'lucide-vue-next';
import { MaskInput } from 'vue-3-mask';

import { formatPrice } from '../utils/formatarValores.js';
import ToastSuccess from '../components/toasts/ToastSuccess.vue';
import ToastError from '../components/toasts/ToastError.vue';
import CarrinhoVazio from '../components/carrinho/CarrinhoVazio.vue';
import CarrinhoHeader from '../components/carrinho/CarrinhoHeader.vue';
import CarrinhoItens from '../components/carrinho/CarrinhoItens.vue';

const showToastSuccess = ref(false);
const showToastError = ref(false);
const toastErrorMessage = ref('');
const selectedItem = ref(null);
const myModal = ref(null);
const store = useStore();
const nome = ref('');
const email = ref('');
const celular = ref('');

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

const somaQuantidadeTotal = () => {
  return carrinho.value.reduce(
    (total, item) => total + somaQuantidade(item.quantidadePorTamanho),
    0
  );
};

const numeroAleatorio = () => {
  return Math.floor(Math.random() * 90000) + 10000;
};

const valorTotalCarrinho = computed(() => {
  return carrinho.value.reduce((total, item) => total + item.valorTotal, 0);
});

const removerDoCarrinho = (index) => {
  store.dispatch('removeFromCart', index);

  showToastSuccess.value = true;
  setTimeout(() => {
    showToastSuccess.value = false;
  }, 2000);
};

const validarEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validarTelefone = (telefone) => {
  const telefoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
  return telefoneRegex.test(telefone);
};

const confirmarCarrinho = () => {
  const mensagem = `
*Olá, gostaria de confirmar meu pedido do catálogo:*

*Nome:* ${nome.value}
*Email:* ${email.value}
*Celular:* ${celular.value}

*Resumo do Carrinho:*

_Carrinho:_ #${numeroAleatorio()}
_Quantidades Total:_ ${somaQuantidadeTotal()}
_Valor Total:_ R$ ${formatPrice(valorTotalCarrinho.value)}
  `;

  const mensagemCodificada = encodeURIComponent(mensagem.trim());
  const numeroWhatsApp = '5511948256352';
  const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensagemCodificada}`;

  if (nome.value === '') {
    setTimeout(() => {
      showToastError.value = false;
    }, 2000);

    toastErrorMessage.value = 'Preencha o campo nome!';
    return (showToastError.value = true);
  }

  if (!validarEmail(email.value)) {
    setTimeout(() => {
      showToastError.value = false;
    }, 2000);

    toastErrorMessage.value = 'Preencha com um email válido';
    return (showToastError.value = true);
  }

  if (!validarTelefone(celular.value)) {
    setTimeout(() => {
      showToastError.value = false;
    }, 2000);

    toastErrorMessage.value = 'Preencha com um número de celular válido';
    return (showToastError.value = true);
  }

  window.open(urlWhatsApp, '_blank');
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