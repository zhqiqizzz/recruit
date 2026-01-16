<script setup lang="ts">
import { ref } from 'vue';
import FooterTabbar from '@/components/FooterTabbar.vue';
import TaskList from '@/components/list/TaskList.vue';
import type { Task } from '@/types/task';
const taskList = ref<Task[]>([
    {id: 1},
    {id: 2},
]);
</script>

<template>
    <TaskList :taskList="taskList" />
    <FooterTabbar />
</template>
<style scoped>
</style>