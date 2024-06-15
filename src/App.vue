<script>
import Header from './components/header/Header.vue'
import Catalogo from './components/catalogo/Catalogo.vue'
import ToolBar from './components/toolbar/ToolBar.vue'

export default {
  components: { Header, Catalogo, ToolBar }
}
</script>

<template>
  <div class="relative">
    <Header />
    <Catalogo />
    <ToolBar class='fixed bottom-0 left-0'/>
  </div>
</template>
