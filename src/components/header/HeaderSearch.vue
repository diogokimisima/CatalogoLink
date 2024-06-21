// HeaderSearch

<template>
    <div class="m-3">
        <label class="input input-bordered flex items-center gap-2 ">
            <Search class="text-gray-400 size-5"/>
            <input type="text" class="grow" placeholder="Pesquisar"/>
        </label>
    </div>
</template>

<script setup>
import { Search } from 'lucide-vue-next';
</script>