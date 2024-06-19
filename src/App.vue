<template>
  <div class="relative bg-slate-100">
    <router-view />
    <ToolBar class='fixed bottom-0'/>
  </div>
</template>

<script setup>
import ToolBar from './components/toolbar/ToolBar.vue'
</script>
