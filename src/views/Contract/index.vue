<script setup lang="ts">
import FooterTabbar from '@/components/FooterTabbar.vue';
import ContractPage from '@/views/Contract/Components/ContractPage.vue';
</script>

<template>
    <van-nav-bar title="合约" fixed placeholder />
    <ContractPage />
    <FooterTabbar />
</template>
<style scoped>
</style>