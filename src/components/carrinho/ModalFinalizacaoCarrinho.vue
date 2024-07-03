<template>
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
import { MaskInput } from "vue-3-mask";

const props = defineProps({
  nome: String,
  email: String,
  celular: String,
  showToastError: Boolean,
  toastErrorMessage: String,
  confirmarCarrinho: Function,
});
</script>
