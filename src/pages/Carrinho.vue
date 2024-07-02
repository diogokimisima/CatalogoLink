<template>
  <transition name="slide">
    <ToastSuccess class="z-50" v-if="showToast" message="Produto excluído com sucesso" />
  </transition>

  <header>
    <div role="tablist" class="tabs tabs-lifted py-5 px-1">
      <a role="tab" class="tab tab-active h-12"
        ><span
          class="bg-blue-950 w-5 h-5 rounded-full text-white flex items-center justify-center mr-1"
        >
          1
        </span>
        Carrinho
      </a>
      <a
        role="tab"
        class="tab text-nowrap h-12 bg-neutral-200 text-black text-opacity-30"
      >
        <span
          class="bg-blue-950 w-5 h-5 rounded-full text-white flex items-center justify-center bg-opacity-30 mr-1"
        >
          2
        </span>
        Dados
      </a>
      <a role="tab" class="tab text-nowrap h-12 bg-neutral-200 text-black text-opacity-30"
        ><span
          class="bg-blue-950 w-5 h-5 rounded-full text-white flex items-center justify-center bg-opacity-30 mr-1"
        >
          3
        </span>
        Fechamento
      </a>
    </div>
    <div class="flex justify-center">
      <h1 class="font-bold text-xl border-b border-slate-400">Carrinho</h1>
    </div>
  </header>

  <div class="flex flex-col justify-center items-center">
    <div
      v-if="carrinho.length === 0"
      class="flex flex-col items-center justify-center pt-40"
    >
      <h1 class="font-semibold">SEU CARRINHO ESTÁ VAZIO</h1>

      <router-link to="/" class="text-blue-600 mt-5 block text-xl">
        Voltar para o catalogo
      </router-link>
    </div>

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
        <li
          v-motion-fade-visible
          v-for="(item, index) in carrinho"
          :key="index"
          :class="[
            'mb-6 p-2 rounded-md shadow-md shadow-neutral-400',
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
                  <span class="font-semibold">Valor Unitário:</span> R${{
                    formatPrice(item.valorUnitario)
                  }}
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
                <li class="italic">
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

  <!-- modal para finalizar o carrinho -->
  <dialog id="my_modal_3" class="modal">
    <div class="modal-box">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
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
          <input v-model="celular" type="text" class="grow" placeholder="Celular" />
        </label>
        <button @click="confirmarCarrinho" class="bg-blue-950 text-white p-2 rounded-md">Confirmar</button>
      </div>
    </div>
  </dialog>
</template>

<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { Trash2, User, Mail, Phone  } from "lucide-vue-next";

import { formatPrice } from "../utils/formatarValores.js";
import ToastSuccess from "../components/toasts/ToastSuccess.vue";

const showToast = ref(false);
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
  return carrinho.value.reduce((total, item) => total + somaQuantidade(item.quantidadePorTamanho), 0);
};


const numeroAleatorio = () => {
  return Math.floor(Math.random() * 90000) + 10000;
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

const confirmarCarrinho = () => {
  const mensagem = `
*Olá, gostaria de confirmar meu pedido do catálogo:*

*Nome:* ${nome.value}
*Email:* ${email.value}
*Celular:* ${celular.value}

*Resumo do Carrinho:*

_Carrinho:_ #${numeroAleatorio()}
_Total de Quantidades:_ ${somaQuantidadeTotal()}
_Valor Total:_ R$ ${formatPrice(valorTotalCarrinho.value)}
  `;

  const mensagemCodificada = encodeURIComponent(mensagem.trim());
  const numeroWhatsApp = '5511948256352';
  const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensagemCodificada}`;

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
