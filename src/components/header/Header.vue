<template>
    <header>
        <HeaderBanner />
        
        <div ref="headerBanner">
            <HeaderSearch @highlight-user="highlightUser"/>
        </div>

        <div :class="{ 'fixed top-0 w-full z-10': isSticky }">
            <HeaderCategorias />
        </div>
    </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

import HeaderBanner from './HeaderBanner.vue';
import HeaderCategorias from './HeaderCategorias.vue';
import HeaderSearch from './HeaderSearch.vue';

const isSticky = ref(false);
const headerBanner = ref(null);
const highlight = ref('')

function highlightUser(searched){
    highlight.value = searched
    console.log('searched ' +searched)

}

const handleScroll = () => {
    if (headerBanner.value) {
        const bannerBottom = headerBanner.value.getBoundingClientRect().bottom;
        isSticky.value = bannerBottom <= 0;
    }
};

onMounted(() => {
    window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll);
});


</script>
