<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { systemDetailsApi } from '@/api/message';
import { onMounted, ref } from 'vue';
const router = useRouter();
const route = useRoute();
const item = ref<any>([])
const message = ref<any>({})
const loading = ref(false)
const systemMessageId = route.params.id
const leftBack = () => {
    router.back();
}
const getSystemMessageDetails = async () => {
    loading.value = true
    const res = await systemDetailsApi({
        id: systemMessageId
    });
    item.value = res
    message.value = item.value[0]
    loading.value = false
}
onMounted(()=>{
    getSystemMessageDetails()
})
</script>
<template>
    <van-nav-bar title="查看消息" left-arrow @click-left="leftBack"/>
    <h3>{{message.title}}</h3>
    <p>{{message.content}}</p>
</template>
<style scoped>
h3{
    font-size: 0.8rem;
    line-height: 0.8rem;
    font-weight: 400;
    color: #333333;
    margin: 1.7rem 0.75rem 0.83rem;
}
p{
    font-size: 0.69rem;
    font-weight: 500;
    color: #666666;
    line-height: 1.23rem;
    text-indent: 2em;
}
</style>