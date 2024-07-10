<template>
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
        <input
          v-model="localNome"
          type="text"
          class="grow"
          placeholder="Nome"
          @input="updateNome"
        />
      </label>
      <label class="input input-bordered flex items-center gap-2">
        <Mail />
        <input
          v-model="localEmail"
          type="text"
          class="grow"
          placeholder="Email"
          @input="updateEmail"
        />
      </label>
      <label class="input input-bordered flex items-center gap-2">
        <Phone />
        <MaskInput
          v-model="localCelular"
          type="text"
          mask="(##) #####-####"
          class="grow"
          placeholder="Celular: (99) 99999-9999"
          @input="updateCelular"
        />
      </label>
      <button @click="confirmarCarrinho" class="bg-blue-950 text-white p-2 rounded-md">
        Confirmar
      </button>
    </div>
  </div>
</template>

<script setup>
import { Phone, Mail, User, X } from "lucide-vue-next";
import { MaskInput } from "vue-3-mask";

const props = defineProps({
  nome: String,
  email: String,
  celular: String,
  confirmarCarrinho: Function,
});

</script>
