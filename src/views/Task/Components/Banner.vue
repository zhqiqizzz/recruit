<script lang="ts" setup>
import { getBannerListApi } from '@/api/task';
import { onMounted, ref } from 'vue';
const bannerList = ref<any>([])
const getBannerList = async () => {
    const res = await getBannerListApi({type: 2})
    bannerList.value = res.list
}
onMounted(() => getBannerList())
</script>
<template>
    <van-swipe :autoplay="3000" lazy-render class="custom-swipe">
        <van-swipe-item v-for="(item, index) in bannerList" :key="index">
            <a :href="item.url" target="_blank" v-if="item.url">
                <img :src="item.picture" />
            </a>
            <img v-else :src="item.picture" />
        </van-swipe-item>
    </van-swipe>
</template>
<style lang="css" scoped>
    .custom-swipe {   
        :deep(.van-swipe__track){
            height: 7.47rem;
        }
        :deep(.van-swipe__indicators){
            display: none;
        }
    }
    .custom-swipe img{
        width: 100%;
        height: 7.47rem;
        border-radius: 0.5rem;
    }
</style>