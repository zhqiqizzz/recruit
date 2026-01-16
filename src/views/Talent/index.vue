<script setup lang="ts">
import { ref } from 'vue';
import FooterTabbar from '@/components/FooterTabbar.vue';
import TalentList from '@/components/list/TalentList.vue';
import type { Talent } from '@/types/talent';
const talentList = ref<Talent[]>([
    {id: 1},
    {id: 2},
]);
</script>

<template>
    <TalentList :talentList="talentList" />
    <FooterTabbar />
</template>
<style scoped>
</style>