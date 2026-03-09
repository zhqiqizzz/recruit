<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useMyStore } from '@/store/my';
import { withdrawalApi } from '@/api/my';
import { Toast } from 'vant';
import { watch } from 'vue';
const router = useRouter();
const myStore = useMyStore()
const leftBack = () => {
    router.back()
}
const state = reactive({
    price: null as number | null
})
// 全部提现
const allAdvance = () => {
    state.price = myStore.userInfo.account_price
}
const submitAdvance = async () => {
    const res = await withdrawalApi({ price: state.price })
    if(res.errCode === 200) {
        myStore.getUserInfo()
        router.back()
    }
    Toast(res.msg)
}
watch(() => state.price, (newVal) => {
    if(newVal === null) {
        Toast('请输入提现金额')
        return
    }
    if(newVal <= 0) {
        Toast('请输入正确的提现金额')
        return
    }
    if(newVal > 0 && newVal < 0.1) {
        Toast('提现金额不能小于0.1元')
        return
    }
    if(newVal > 50000) {
        Toast('提现金额不能大于10000元')
        return
    }
    if(newVal > myStore.userInfo.account_price) {
        Toast('已超出可提现余额')
        state.price = myStore.userInfo.account_price
    }
    if(newVal){
        state.price = parseFloat(newVal.toFixed(2))
    }
})
onMounted(() => {
    myStore.getUserInfo()
})
</script>
<template>
  <van-nav-bar title="提现" left-arrow @click-left="leftBack"/>
  <div class="advance">
    <van-form @submit="submitAdvance">
        <div class="advance-amount">
            <h5>提现金额</h5>
            <div>
                <span>￥</span>
                <input v-model="state.price" type="number" />
            </div>
            <p>
                <span>可提现余额￥{{myStore.userInfo.account_price}}</span>
                <label @click="allAdvance">全部提现</label>
            </p>
        </div>
        <button class="advance-btn" native-type="submit">提现至支付宝</button>
    </van-form>
  </div>
</template>
<style scoped>
  :v-deep(.van-nav-bar__content){
    background: #FF8E00;
  }
  :v-deep(.van-nav-bar__title),:v-deep(.van-icon-arrow-left:before){
    color: #ffffff;
  }
  .advance{
    padding: 1.17rem 0.64rem 0 ;
    background: #f9f9f9;
    height: calc(100vh - 46px - 1.17rem);
  }
  .advance-amount{
    background: #FFFFFF;
    border-radius: 0.27rem;
    padding: 1.31rem 0.72rem 0rem;
  }
  h5{
    font-size: 0.75rem;
    line-height: 0.75rem;
    font-weight: 400;
    color: #999999;
    margin-bottom: 2.43rem;
  }
  .advance-amount div{
    font-size: 1.28rem;
    line-height: 1.28rem;
    font-weight: 400;
    color: #333333;
    padding-bottom: 1.6rem;
    border-bottom: 1px solid #eeeeee;
  }
  .advance-amount p{
    padding: 0.93rem 0;
    display: flex;
    justify-content: space-between;
  }
  .advance-amount p label{
    color: #FF8E00;
  }
  .advance-amount p span{
    color: #999999;
  }
.advance-btn{
    height: 2.35rem;
    line-height: 2.35rem;
    background: linear-gradient(90deg, #FFA400, #FF8900);
    border-radius: 0.27rem;
    font-size: 0.8rem;
    color: #FFFFFF;
    border: 0;
    text-align: center;
    width: calc(100vw - 1.28rem);
    margin-top: 1.33rem;
}
</style>