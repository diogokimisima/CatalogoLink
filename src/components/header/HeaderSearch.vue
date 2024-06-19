// HeaderSearch

<template>
    <div class="m-3">
        <label class="input input-bordered flex items-center gap-2 ">
            <input type="text" class="grow" placeholder="Pesquisar" />
            <Search class="text-gray-400"/>
        </label>
    </div>
</template>

<script setup>
import { Search } from 'lucide-vue-next';
</script>