<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import AccountInfo from '@/views/My/Components/AccountInfo.vue';
import AccountList from '@/views/My/Components/AccountList.vue';
import { transferListApi, incomeListApi } from '@/api/my';
import { useMyStore } from '@/store/my';
const myStore = useMyStore()
const router = useRouter();
const state = reactive({
    check: 0,
    loading: false,
    accountList: [] as Array<any>
})
const tabs = [
    {
        type: 0,
        text: '全部'
    },
    {
        type: 1,
        text: '收入'
    },
    {
        type: 2,
        text: '提现'
    }
]
if(myStore.userInfo.role === 3){
    tabs.splice(2,0,{
        type: 3,
        text: '支出'
    })
}
const leftBack = () => {
    router.back()
}
const getTransferList = async () => {
    state.loading = true
    const res = await transferListApi()
    state.accountList.push(res)
    state.loading = false
}
const getIncomeList = async (data: any) => {
    state.loading = true
    const res = await incomeListApi(data)
    state.accountList.push(res)
    state.loading = false
}

const toCheck = async (index: number, type: number) => {
    state.check = index
    state.accountList = []
    if (type === 0) {
        await getTransferList()
        await getIncomeList({ type: 1 })
        if(myStore.userInfo.role === 3) {
            await getIncomeList({ type: 2 })
        }
        state.accountList = state.accountList.flat(2)
    } else if (type === 1) {
        await getIncomeList({ type: 1 })
        state.accountList = state.accountList.flat(2)
    } else if(type === 2) {
        await getTransferList()
        state.accountList = state.accountList.flat(2)
    } else { // type === 3
        await getIncomeList({ type: 2 })
        state.accountList = state.accountList.flat(2)
    }
}
onMounted(() => {
    myStore.getUserInfo()
    toCheck(0, 0)
})
</script>
<template>
  <van-nav-bar title="我的账户" left-arrow @click-left="leftBack"/>
  <AccountInfo></AccountInfo>
  <dl>
    <dt @click="toCheck(index, value.type)" 
    :class="{ active: state.check === index }" 
    v-for="(value, index) in tabs" :key="index">{{value.text}}</dt>
  </dl>
  <AccountList :accountList="state.accountList"></AccountList>
</template>
<style scoped>
  :v-deep(.van-nav-bar__content){
    background: #FF8E00;
  }
  :v-deep(.van-nav-bar__title),:v-deep(.van-icon-arrow-left:before){
    color: #ffffff;
  }
  .van-hairline--bottom:after{
    border: 0;
  }
  dl{
    border-bottom: 1px solid #eeeeee;
    display: flex;
    justify-content: space-around;
  }
  dl dt{
    padding: 1.47rem 0 0.59rem;
    font-size: 0.75rem;
    line-height: 0.75rem;
    font-weight: 500;
    color: #666666;
  }
  dl dt.active{
    color:#FF8E00;
    border-bottom: 1px solid #FF8E00;
  }
</style>