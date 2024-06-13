<script>
    import HeaderBanner from './HeaderBanner.vue'
    import HeaderCategorias from './HeaderCategorias.vue'
    import HeaderCardCategorias from './HeaderCategorias.vue'

    export default {
        components: { HeaderBanner, HeaderCategorias,HeaderCardCategorias }
    }
</script>

<template>
    <header>
        <HeaderBanner />
        <HeaderCategorias />
        <HeaderCardCategorias />
    </header>   
</template>
