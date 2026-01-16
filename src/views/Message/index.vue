<script setup lang="ts">
import { ref } from 'vue';
import FooterTabbar from '@/components/FooterTabbar.vue';
import MessageList from '@/components/list/MessageList.vue';
import type { Message } from '@/types/message';
const messageList = ref<Message[]>([
    {id: 1},
    {id: 2},
]);
</script>

<template>
    <MessageList :messageList="messageList" />
    <FooterTabbar />
</template>
<style scoped>
</style>