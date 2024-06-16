<template>
    <div class="bg-gray-800 text-gray-100 overflow-y-auto flex flex-col items-center justify-center h-24">
        <ul class="flex flex-row space-x-2">
            <li class="px-3 py-2 hover:bg-gray-900 rounded">
                <a href="#" class="block">Todos</a>
            </li>
            <li v-for="categoria in categorias" :key="categoria" class="px-3 py-2 hover:bg-gray-900 rounded">
                <a href="#" class="block">{{ categoria.charAt(0).toUpperCase() + categoria.slice(1) }}</a>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

import { catalogo } from '../../data/catalogo';

const categorias = ref([]);

const extrairCategorias = () => {
    const categoriasUnicas = [...new Set(catalogo.map(item => item.categoria))];
    categorias.value = categoriasUnicas;
};

onMounted(() => {
    extrairCategorias();
});
</script>
