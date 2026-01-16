<script setup lang="ts">
import { ref } from 'vue';
import FooterTabbar from '@/components/FooterTabbar.vue';
import ContractList from '@/components/list/ContractList.vue';
import type { Contract } from '@/types/contract';
const contractList = ref<Contract[]>([
    {id: 1},
    {id: 2},
]);
</script>

<template>
    <ContractList :contractList="contractList" />
    <FooterTabbar />
</template>
<style scoped>
</style>