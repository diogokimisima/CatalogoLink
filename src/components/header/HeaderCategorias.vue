<!-- HeaderCategorias.vue -->

<template>
    <div class="bg-blue-950 text-gray-100 overflow-y-auto flex items-center h-20">
        <ul class="flex flex-row">
            <li class="px-6 py-2 hover:bg-gray-900 rounded">
                <a href="#" class="block" @click.prevent="selectCategory('Todos')">Todos</a>
            </li>
            <li v-for="categoria in categorias" :key="categoria" class="px-3 py-2 hover:bg-gray-900 rounded">
                <a href="#" class="whitespace-nowrap text-base" @click.prevent="selectCategory(categoria)">
                    {{ categoria.charAt(0).toUpperCase() + categoria.slice(1) }}
                </a>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { catalogo } from '../../data/catalogo.js';

const categorias = ref([]);
const extrairCategorias = () => {
    const categoriasUnicas = [...new Set(catalogo.map(item => item.categoria))];
    categorias.value = categoriasUnicas;
};

const emit = defineEmits(['category-selected']);
const selectCategory = (categoria) => {
    emit('category-selected', categoria);
};

onMounted(() => {
    extrairCategorias();
});
</script>
