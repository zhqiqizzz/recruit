<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getPolicy } from '@/api/user'
const state = ref({
    content: '',
})
const onClickLeft = () => {
    history.back();
}
const getPolicyChange = async () => {
    const res = await getPolicy({id: 1})
    state.value.content = res.content
}
onMounted(() => getPolicyChange())
</script>
<template>
    <van-nav-bar
    title="服务协议"
    left-text=""
    left-arrow
    @click-left="onClickLeft"
    />
    <div class="text-agree" v-html="state.content"></div>
</template>
<style scoped>
  .text-agree{
      padding: 0.5rem 0.7rem;
  }
</style>