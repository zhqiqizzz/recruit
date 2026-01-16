<script setup lang="ts">
    import {useRouter} from 'vue-router'
    import type { Contract } from '@/types/contract';
    const props = withDefaults(defineProps<{
        contractList: Contract[]
    }>(),{
        contractList: () => []
    })
    const router = useRouter()
    const gotoDetail = (id: number) =>{
        router.push(`/contract/details/${id}`)
    }
</script>
<template>
    <dl v-for="(item,index) in props.contractList" :key="index" @click="gotoDetail(item.id)">
        <dd>
            <!-- <h3>{{item.contract_name}}</h3> -->
             <h3>软件开发合约</h3>
            <!-- <span>{{item.is_contract_type_text}}</span> -->
            <span>正式合约</span>
            <van-icon name="arrow" />
        </dd>
        <dt>
            <label>公司名称</label>
            <!-- <span>{{item.company_name}}</span> -->
            <span>深圳市阿里巴巴网络技术有限公司</span>
        </dt>
        <dt>
            <label>合约类型</label>
            <!-- <span>{{item.contract_type}}</span> -->
            <span>正式合约</span>
        </dt>
        <dt>
            <label>合约周期</label>
            <!-- <span>{{item.start_cycle_time}}-{{item.end_cycle_time}}</span> -->
            <span>2023-01-01 - 2023-12-31</span>
        </dt>
        <dt>
            <label>签约时间</label>
            <!-- <span>{{item.signing_time}}</span> -->
            <span>2023-01-01</span>
        </dt>
        <dt>
            <label>合约进度</label>
            <span></span>
        </dt>
        <dt class="contract-progress">
            <i></i>
            <i></i>
            <i></i>
            <i></i>
        </dt>
        <!-- <dt>
            <ProgressBar :item="item"></ProgressBar>
        </dt> -->
    </dl>
</template>
<style scoped>
dl{
    font-size: 0.64rem;
    color: #666666;
    padding: 1rem 0.7rem;
    border-bottom: 1px solid #eeeeee;
}
dl dd{
    display: flex;
    margin-bottom: 0.9rem;
    align-items: center;
}
dl dd h3{
    font-size: 0.8rem;
    font-weight: 500;
    color: #333333;
    flex: 1;
}
dl dd span{
    text-align: right;
    font-size: 0.75rem;
    color: #FF9415;
}
dl dd i{
    font-size: 0.75rem;
}
dl dt{
    display: flex;
    margin-bottom: 0.72rem;
}
dl dt:last-child{
    margin-bottom: 0;
}
dl dt label{
    flex: 1;
}
dl dt span{
    text-align: right;
}
.contract-progress{
    display: flex;
    height: 0.53rem;
    width: 100%;
}
.contract-progress i{
    flex: 1;
    background: #f3f3f3;
    margin: 0 1px;
}
.contract-progress i.green{
    background: #50D400;
}
.contract-progress i.orange{
    background: #FE9215;
}
.contract-progress i.red{
    background: #FF4800;
}
</style>