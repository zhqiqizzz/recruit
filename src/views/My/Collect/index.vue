<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import TaskList from '@/components/list/TaskList.vue';
import { collectListApi } from '@/api/my';
import { Toast } from 'vant';
const router = useRouter()
const state = reactive({
    list: [] as any[],
    loading: false
})
const leftBack = () => {
    router.back()
}
const getCollectList = async () => {
    state.loading = true
    const res = await collectListApi()
    state.list = res.data
    if(!res) Toast(res.msg)
    state.loading = false
}
onMounted(() => {
    getCollectList()
})
</script>
<template>
<div class="set-page">
    <van-nav-bar title="我的收藏" left-arrow @click-left="leftBack"/>
    <div class="collect-page">
        <van-pull-refresh v-model="state.loading" @refresh="getCollectList">
            <TaskList :taskList = "state.list"></TaskList>
            <div class="wy-no-data" v-if="!state.loading && state.list.length==0">暂无数据</div>
        </van-pull-refresh>
    </div>
</div>
</template>
<style scoped>
.collect-page{
    background: #f9f9f9;
    padding: 0.4rem 0.64rem 0;
    height: calc(100vh - 46px - 0.4rem);
}
</style>