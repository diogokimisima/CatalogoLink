<template>
  <div class="relative bg-slate-100">
    <Header/>
    <Catalogo />
    <ToolBar class='fixed bottom-1'/>
  </div>
</template>

<script setup>
import Header from './components/header/Header.vue'
import Catalogo from './components/catalogo/Catalogo.vue'
import ToolBar from './components/toolbar/ToolBar.vue'

</script>