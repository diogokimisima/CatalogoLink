//CatalogoCard.vue

<template>
    <div v-for="item in catalogo" :key="item.id" >
        <button onclick="my_modal_3.showModal()"
                class="card card-compact w-80 bg-base-100 shadow-xl mx-auto my-10 rounded-none ">
            <figure>
                <img :src="item.imagem" :alt="'Image ' + item.id" />
            </figure>
        </button>
    </div>
</template>

<script>
import { catalogo } from "../../data/catalogo.js";

export default {
    data() {
        return {
            catalogo: catalogo
        };
    }
};
</script>
