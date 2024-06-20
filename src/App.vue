<template>
  <div class="relative bg-slate-50 my-0 mx-0 py-0 px-0">
    <router-view />
    <ToolBar class='fixed bottom-0'/>
  </div>
</template>

<script setup>

import ToolBar from './components/toolbar/ToolBar.vue'
</script>
