<template>
    <div class="bg-blue-950 text-gray-100 overflow-y-auto flex items-center h-20">
        <ul class="flex flex-row mx-2">
            <li @click.prevent="selectCategory('Todos')"
                :class="{ 'border-b-2 border-white': selectedCategory === 'Todos' }" class="px-6 py-2 cursor-pointer">
                <a class="block">
                    Todos
                </a>
            </li>
            <li v-for="categoria in categorias" :key="categoria" @click.prevent="selectCategory(categoria)" :class="[
                'px-3 py-2 cursor-pointer',
                selectedCategory === categoria ? 'border-b-2 border-white transition-colors duration-500 ease-in-out' : 'border-b-2 border-transparent'
            ]">
                <a class="whitespace-nowrap text-base">
                    {{ categoria.charAt(0).toUpperCase() + categoria.slice(1) }}
                </a>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { catalogo } from '../../data/catalogo.js';

const categorias = ref([]);
const selectedCategory = ref('Todos');

const extrairCategorias = () => {
    const categoriasUnicas = [...new Set(catalogo.map(item => item.categoria))];
    categorias.value = categoriasUnicas;
};

const emit = defineEmits(['category-selected']);
const selectCategory = (categoria) => {
    selectedCategory.value = categoria;
    emit('category-selected', categoria);
};

onMounted(() => {
    extrairCategorias();
});

//   watch(selectedCategory, (newValue, oldValue) => {
//     console.log('Categoria selecionada:', newValue);
//   });

</script>