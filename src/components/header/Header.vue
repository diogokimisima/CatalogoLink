
<template>
    <header>

        <HeaderBanner />
        
        <div ref="headerBanner">
            <HeaderSearch />
        </div>

        <div :class="{ 'fixed top-0 w-full z-50': isSticky }">
            <HeaderCategorias />
        </div>

        <HeaderCardCategorias />

    </header>
</template>

<script>
import HeaderBanner from './HeaderBanner.vue'
import HeaderCategorias from './HeaderCategorias.vue'
import HeaderCardCategorias from './HeaderCardCategorias.vue'
import HeaderSearch from './HeaderSearch.vue';

export default {
    components: { HeaderBanner, HeaderCategorias, HeaderCardCategorias, HeaderSearch },
    data() {
        return {
            isSticky: false
        };
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll);
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
        handleScroll() {
            const headerBanner = this.$refs.headerBanner;
            if (headerBanner) {
                const bannerBottom = headerBanner.getBoundingClientRect().bottom;
                this.isSticky = bannerBottom <= 0;
            }
        }
    }
}
</script>
