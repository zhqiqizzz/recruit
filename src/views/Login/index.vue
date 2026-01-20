<script setup lang="ts">
import { ref } from 'vue';
import { getCode } from '@/api/user'
import { Notify } from 'vant';
import { useUserStore } from '@/store/user';
import { useRouter } from 'vue-router';
const userStore = useUserStore();
const router = useRouter();
const state = ref({
   accounts: '',
   code: '',
   isChecked: false,
   codeText: '获取验证码',
   time: 60,
   timer: null as any,     
})
const getCodeChange = async () => {
    if(state.value.timer) return
    const res = await getCode({ accounts: state.value.accounts })
    if(res){
        state.value.timer = setInterval(() => {
            state.value.time--
            if(state.value.time <= 0){
                clearInterval(state.value.timer)
                state.value.timer = null
                state.value.time = 60
                state.value.codeText = '获取验证码'
            } else {
                state.value.codeText = `${state.value.time}s后重发`
            }
        }, 1000)
        state.value.code = res.code
    }
}

const toLogin = async () => {
    if(state.value.code === '' || state.value.accounts === ''){
        Notify({ type: 'warning', message: '请输入手机号和验证码' });
        return
    }
    if(!state.value.isChecked){
        Notify({ type: 'warning', message: '请阅读并同意服务协议和隐私政策' });
        return
    }
    await userStore.loginUser({
        accounts: state.value.accounts,
        code: state.value.code
    })
    if(userStore.role === '1'){
      console.log('跳转任务页')
        router.push('/task')
    } else if(userStore.role === '2'){
        router.push('/admin/home')
    } else if(userStore.role === '3'){
        router.push('/talent')
    } else {
        Notify({ type: 'warning', message: '用户角色异常，请联系管理员' });
    }
}
</script>
<template>
  <div>
    <van-icon class="icon-left" name="arrow-left"/>
    <div class="login-form">
      <h3>验证码登录</h3>
      <div class="login-form-item">
        <i class="icon-phone"></i>
        <input placeholder="请输入手机号" type="text" v-model="state.accounts" />
      </div>
      <div class="login-form-item">
        <i class="icon-code"></i>
        <input placeholder="请输入验证码" type="text" v-model="state.code" />
        <span @click="getCodeChange">{{ state.codeText }}</span>
      </div>
      <van-button type="primary" block @click="toLogin">登录</van-button>
      <div class="login-form-label">
        <van-checkbox v-model="state.isChecked">我已阅读</van-checkbox>
        <router-link to="/login/serviceAgree">《IT企业平台服务协议》</router-link>和
        <router-link to="/login/privacyPolicy">《隐私政策》</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.icon-left{
  font-size: 0.8rem;
  margin: 0.67rem 0 0 0.67rem;
}
.login-form{
  padding: 0 1.07rem;
}
.login-form h3{
  font-size: 1.39rem;
  line-height: 1.39rem;
  font-weight: 400;
  color: #333333;
  margin-top: 2.35rem;
  margin-bottom: 4rem;
  padding-left: 0.3rem;
}
.login-form-item{
  display: flex;
  font-size: 0.75rem;
  font-weight: 300;
  color: #9FA7AD;
  margin: 0 0.18rem 2rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid #E7E7E7;
  align-items: center;
}
.icon-phone{
  background: url('@/assets/img/icon/icon-phone.png') no-repeat;
  background-size: 100%;
  width: 1.01rem;
  height: 1.01rem;
}
.icon-code{
  background: url('@/assets/img/icon/icon-code.png') no-repeat;
  background-size: 100%;
  width: 1.01rem;
  height: 1.01rem;
}
.login-form-item input{
  flex: 1;
  margin-left: 0.48rem;
}
.login-form-item span{
  font-size: 0.75rem;
  font-weight: 300;
  color: #FE9527;
  border-left: 1px solid #FE9527;
  line-height: 0.75rem;
  padding-left: 0.56rem;
}
.login-form-label{
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 1.5rem;
  left: 0;
  width: 100%;
}
</style>
