<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// 定义菜单数据
const tabList = [
  { title: '任务', path: '/task', icon: 'icon-task-bar' },
  { title: '合约', path: '/contract', icon: 'icon-contract-bar' },
  { title: '消息', path: '/message', icon: 'icon-message-bar' },
  { title: '我的', path: '/my', icon: 'icon-my-bar' }
]

const gotoPage = (path: string) => {
  router.push(path)
}
</script>

<template>
  <dl>
    <dt 
      v-for="item in tabList" 
      :key="item.path"
      :class="[item.icon, { active: route.path.startsWith(item.path) }]"
      @click="gotoPage(item.path)"
    >
      <i></i>
      <p>{{ item.title }}</p>
    </dt>
  </dl>
</template>

<style scoped>
dl{
    display: flex;
    width: 100%;
    height: 3rem;
    position: fixed;
    bottom: 0px;
    left: 0px;
    border-top: 1px solid #dddddd;
    background: #ffffff;
}
dl dt{
    flex: 1;
    padding: 0.69rem 0;
    justify-content: center;
    text-align: center;
    font-size: 0.59rem;
    font-family: PingFang SC;
    font-weight: 400;
    color: #666666;
}
dl dt i{
    width: 0.91rem;
    height: 0.91rem;
    display: block;
    margin: 0 auto;
}
.icon-task-bar i{
    background: url('@/assets/img/icon/bar-task-link.png') no-repeat;
    background-size: 100%;
}
.icon-task-bar.active i{
    background: url('@/assets/img/icon/bar-task-active.png') no-repeat;
    background-size: 100%;
}
.icon-talent-bar i{
    background: url('@/assets/img/icon/bar-talent-link.png') no-repeat;
    background-size: 100%;
}
.icon-talent-bar.active i{
    background: url('@/assets/img/icon/bar-talent-active.png') no-repeat;
    background-size: 100%;
}
.icon-contract-bar i{
    background: url('@/assets/img/icon/bar-contract-link.png') no-repeat;
    background-size: 100%;
}
.icon-contract-bar.active i{
    background: url('@/assets/img/icon/bar-contract-active.png') no-repeat;
    background-size: 100%;
}
.icon-message-bar i{
    background: url('@/assets/img/icon/bar-message-link.png') no-repeat;
    background-size: 100%;
}
.icon-message-bar.active i{
    background: url('@/assets/img/icon/bar-message-active.png') no-repeat;
    background-size: 100%;
}
.icon-my-bar i{
    background: url('@/assets/img/icon/bar-my-link.png') no-repeat;
    background-size: 100%;
}
.icon-my-bar.active i{
    background: url('@/assets/img/icon/bar-my-active.png') no-repeat;
    background-size: 100%;
}
dl dt.active p{
    color: #ff9415;
}
</style>