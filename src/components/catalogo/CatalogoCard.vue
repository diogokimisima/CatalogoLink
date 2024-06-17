<template>
    <div v-for="(item, index) in catalogo" :key="item.id">
        <button @click="showModal(item)"
            :class="['card card-compact w-80 bg-base-100 shadow-xl mx-auto my-10 rounded-none', { 'mb-40': index === catalogo.length - 1 }]">
            <figure>
                <img :src="item.imagem" :alt="'Image ' + item.id" />
            </figure>
        </button>
    </div>

    <dialog ref="myModal" id="my_modal_3" class="modal py-12">
        <div class="modal-box h-full">

            <form method="dialog">
                <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-2xl border-none">
                    <X />
                </button>
            </form>

            <div class="border-b border-b-gray-400 ">
                <h3 class="font-bold text-lg">{{ selectedItem?.title }}</h3>
                <p>Cor: {{ selectedItem?.cor }}</p>
                <p>Código do produto: {{ selectedItem?.id_produto }}</p>
            </div>

            <div class="my-5">
                <img :src="selectedItem?.imagem" alt="imagem">
            </div>

            <div class="mt-5 overflow-y-auto flex flex-column items-center justify-center h-24">
                <ul class="flex flex-row space-x-2">
                    <li class="px-3 py-2 hover:bg-gray-900 rounded " 
                    v-for="relatedItem in relatedItems" :key="relatedItem.id" >
                        <img class="block" :src="relatedItem.imagem" :alt="'Image ' + relatedItem.id" />
                    </li>
                </ul>
            </div>

            <div>
                <ul>
                    <li v-for="tamanho in selectedItem?.tamanho" :key="tamanho" class="flex flex-column">
                        <p>{{ tamanho }}</p>
                        <InputNumber />
                    </li>
                </ul>
            </div>

            
        </div>
    </dialog>
</template>

<script setup>
import { X } from 'lucide-vue-next';
import { ref, computed } from 'vue';

import { catalogo } from "../../data/catalogo.js";
import InputNumber from './CatalogoInputNumber.vue';

const selectedItem = ref(null);
const myModal = ref(null);

const showModal = (item) => {
    selectedItem.value = item;
    myModal.value.showModal();
};

const relatedItems = computed(() => {
    if (!selectedItem.value) return [];
    return catalogo.filter(item => item.id_categoria === selectedItem.value.id_categoria);
});
</script>