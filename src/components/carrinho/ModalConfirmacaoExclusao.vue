<template>
  <dialog ref="myModal" id="my_modal_2" class="modal">
    <div class="modal-box">
      <h3 class="text-lg font-bold">Confirmação de exclusão</h3>
      <p class="py-4">
        Confirma a exclusão do item
        <span class="font-bold">{{ item?.numeroItem }} - {{ item?.nomeProduto }}</span>
      </p>
      <form method="dialog" class="mt-5">
        <div class="flex">
          <button
            class="border-neutral-200 border p-2 rounded-md"
            @click="confirmarExclusao"
          >
            Confirmar
          </button>
          <button class="ml-auto border-neutral-200 border p-2 rounded-md" @click="cancelarExclusao">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  </dialog>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  item: Object,
  confirmarExclusao: Function,
  cancelarExclusao: Function,
});

const emit = defineEmits(['confirmar', 'cancelar']);

const confirmarExclusao = () => {
  emit('confirmar');
};

const cancelarExclusao = () => {
  emit('cancelar');
};
</script>
