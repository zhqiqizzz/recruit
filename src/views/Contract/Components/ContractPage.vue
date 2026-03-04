<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getContractListApi } from '@/api/contract';
import ContractList from '@/components/list/ContractList.vue';
import { useUserStore } from '@/store/user';
import { watch } from 'vue';
const userStore = useUserStore();
const loading = ref(false);
const refreshing = ref(false);
const type = ref(2);
const contractList = ref<any[]>([]);
const tabs = [
    {
        type: 2,
        text: '待签约'
    },
    {
        type: 3,
        text: '履约中'
    },
    {
        type: 4,
        text: '已完成'
    },
    {
        type: 5,
        text: '已失效'
    },
]

const setTabList = (tabType: number) => {
    if(type.value === tabType) return
    type.value = tabType
}

const getContractList = async () => {
    loading.value = true;
    const res = await getContractListApi({ 
        is_contract_type: type.value,
        curr_identity: userStore.userInfo.role
    })
    contractList.value = res.records
    loading.value = false
}

const onRefresh = () => {
    refreshing.value = true;
    getContractList().then(() => {
        refreshing.value = false;
    })
}
watch(type, () => {
    getContractList()
})
onMounted(() => {
    getContractList()
})
</script>
<template>
    <div class="contract-tab">
        <span v-for="(item,index) in tabs" 
        :key="index"
        :class="{ active: type === item.type }" 
         @click="setTabList(item.type)">{{item.text}}
         <i></i></span>
    </div>
    <van-pull-refresh
        v-model="refreshing"
        success-text="刷新成功"
        @refresh="onRefresh"
    >
        <ContractList :contractList="contractList" />
        <div class="wy-no-data" v-if="!loading && !refreshing && contractList.length === 0">暂无数据</div>
    </van-pull-refresh>
</template>
<style scoped>
  .van-pull-refresh{
    height: calc(100vh - 46px - 5rem);
    overflow: auto;
  }
  .contract-tab{
    display: flex;
  }
  .contract-tab span{
    font-size: 0.75rem;
    line-height: 0.75rem;
    font-weight: 400;
    color: #666666;
    flex: 1;
    align-items: center;
    border-bottom: 1px solid #EEEEEE;
    padding: 0.59rem 0;
    text-align: center;
    position: relative;
  }
  .contract-tab span.active{
    color: #FF9415;
  }
  .contract-tab span.active i{
    width: 1.63rem;
    height: 0.05rem;
    background: #FF9415;
    position: absolute;
    bottom: 0px;
    left: 50%;
    margin-left: -0.815rem;
  }
</style>