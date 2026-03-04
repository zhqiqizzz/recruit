<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import ProgressBar from '@/views/Contract/Components/ProgressBar.vue';
import { useUserStore } from '@/store/user';
import { getContractDetailApi } from '@/api/contract';
const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const item = ref<any>("");
// const evaluationBoll = ref(false);
const loading = ref(false);
// const num = ref(0);
const contractId = route.params.id;
const leftBack = () => {
    router.back()
}

const getContractDetail = async () => {
    loading.value = true;
    const res = await getContractDetailApi({ 
        id: contractId
    })
    item.value = res.records[0]
    loading.value = false;
}

// const evaluation = (n: number) => {
//     num.value = n;
//     evaluationBoll.value = true;
// }
// const closeEvaluation = (bool: any) => {
//     if(bool) getContractDetail()
//     evaluationBoll.value = false;
// }

onMounted(() => {
    getContractDetail()
})
</script>
<template>
    <van-nav-bar title="合约进度" left-arrow @click-left="leftBack"/>
    <div v-if="item">
        <h3>{{item.contract_name}}</h3>
        <div class="progress-bar">
            <ProgressBar :item="item"></ProgressBar>
            <div class="progress-bar-text">
                <span>第一阶段</span>
                <span>第二阶段</span>
                <span>第三阶段</span>
                <span>第四阶段</span>
            </div>
        </div>
        <dl>
            <dt>
                <h4>第一阶段开发进度评估<span v-if="item.contract_I_state==-1 && userStore.userInfo.role!=3">暂无评估</span></h4>
                <!-- <span class="active" v-if="item.contract_I_state==-1 && userStore.userInfo.role==3" @click="evaluation(1)">去评估</span></h4> -->
                <p v-if="item.contract_I_stage">{{item.contract_I_stage}}</p>
            </dt>
            <dt>
                <h4>第二阶段开发进度评估<span v-if="item.contract_II_state==-1 && userStore.userInfo.role!=3">暂无评估</span></h4>
                <!-- <span class="active" v-if="item.contract_II_state==-1 && userStore.userInfo.role==3" @click="evaluation(2)">去评估</span></h4> -->
                <p v-if="item.contract_II_stage">{{item.contract_II_stage}}</p>
            </dt>
            <dt>
                <h4>第三阶段开发进度评估<span v-if="item.contract_III_state==-1 && userStore.userInfo.role!=3">暂无评估</span></h4>
                <!-- <span class="active" v-if="item.contract_III_state==-1 && userStore.userInfo.role==3" @click="evaluation(3)">去评估</span></h4> -->
                <p v-if="item.contract_III_stage">{{item.contract_III_stage}}</p>
            </dt>
            <dt>
                <h4>第四阶段开发进度评估<span v-if="item.contract_IIII_state==-1 && userStore.userInfo.role!=3">暂无评估</span></h4>
                <!-- <span class="active" v-if="item.contract_IIII_state==-1 && userStore.userInfo.role==3" @click="evaluation(4)">去评估</span></h4> -->
                <p v-if="item.contract_IIII_stage">{{item.contract_IIII_stage}}</p>
            </dt>   
        </dl>
    </div>
    <van-loading v-if="!item">加载中...</van-loading>
    <!--进度弹窗-->
    <!-- <van-popup v-model:show="evaluationBoll" position="top" duration="0" :style="{ width: '100%',height: '100%' }">
        <ProgressEvaluation :num="num" :id="contractId"></ProgressEvaluation>
    </van-popup> -->
</template>
<style scoped>
h3{
    font-size: 0.8rem;
    line-height: 0.8rem;
    font-weight: 500;
    color: #333333;
    padding:1.2rem 0.69rem 1rem;
}
.progress-bar{
    margin: 0 0.64rem 1.17rem;
}
.progress-bar-text{
    display: flex;
}
.progress-bar-text span{
    flex: 1;
    text-align: center;
    margin: 0 1px;
    padding-top: 0.45rem;
}
dl{
    margin: 0 0.64rem;
}
dl dt{
    border: 1px solid #EDEDED;
    border-radius: 0.27rem;
    margin-bottom: 0.59rem;
    padding: 0.75rem 0.69rem;
}
dl dt h4{
    display: flex;
    font-size: 0.75rem;
    line-height: 0.75rem;
    font-weight: 300;
    color: #666666;
}
dl dt h4 span{
    flex: 1;
    text-align: right;
    font-size: 0.64rem;
    font-weight: 500;
    color: #ACACAC;
}
dl dt h4 span.active{
    color: #FF9415;
}
dl dt p{
    font-size: 0.64rem;
    font-weight: 400;
    color: #333333;
    line-height: 0.8rem;
    margin-top: 0.77rem;
}
</style>