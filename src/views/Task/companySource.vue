<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getCompanySourceApi } from '@/api/task';
import type { taskItem } from '@/types/task';
import { getUserDetailApi } from '@/api/user';
const router = useRouter();
const route = useRoute();
const loading = ref(true);
const onClickLeft = () => {
    router.back();
}
const taskList = ref<taskItem[]>([]);
const companyInfo = ref<any>({})
const getCompanySource = async () => {
    const companyUserId = route.params.id
    const userRes = await getUserDetailApi(companyUserId);
    const taskRes = await getCompanySourceApi(companyUserId);
    taskList.value = taskRes
    companyInfo.value = userRes
}
onMounted(() => {
    getCompanySource();
    setTimeout(() => {
      loading.value = false;
    }, 500);
});
</script>
<template>
  <div class="company-source-page">
    <van-nav-bar
      title="企业主页"
      left-arrow
      fixed
      placeholder
      z-index="100"
      @click-left="onClickLeft"
      class="custom-nav"
    />

    <div class="company-header">
      <div v-if="loading" class="loading-box">
          <van-loading type="spinner" color="#fff" />
      </div>
      <div v-else class="info-content">
        <img :src="companyInfo.logo" class="logo" />
        <div class="text-area">
          <h2 class="comp-name">{{ companyInfo.company_name }}</h2>
          <p class="comp-sub">
            <van-icon name="manager" /> {{ companyInfo.user_name }}
            <span class="divider">|</span>
            在招职位 {{ taskList.length }} 个
          </p>
        </div>
        <div class="verify-tag" >{{ companyInfo.is_checked ? '已认证' : '未认证' }}</div>
      </div>
      <div class="bg-shape"></div>
    </div>

    <div class="task-list-section">
      <h3 class="section-title">在招职位</h3>
      
      <div v-if="loading">
        <van-skeleton title :row="3" style="margin-top: 20px;" v-for="i in 3" :key="i" />
      </div>

      <div v-else-if="taskList.length > 0" class="list-container">
        <div 
          v-for="item in taskList" 
          :key="item.task_id" 
          class="task-item"
          @click="() => router.push(`/task/details/${item.task_id}`)"
        >
          <div class="item-top">
            <span class="item-name">{{ item.task_name }}</span>
            <span class="item-salary">￥{{ item.salary }} / 月</span>
          </div>
          <div class="item-mid">
            <span class="tag">{{ item.city }}{{ item.area ? `·${item.area}` : '' }}</span>
            <span class="tag">{{ item.task_cycle }}天</span>
            <span class="tag">{{ item.service_mode }}</span>
          </div>
          <div class="item-bot">
             <div class="poster">
                <img :src="item.it_head || item.head_img" class="mini-avatar" />
                <span>{{ item.user_name }}</span>
             </div>
             <span class="time" v-if="item.status === 1">刚刚发布</span>
          </div>
        </div>
      </div>

      <van-empty v-else description="该公司暂无其他职位" />
    </div>

  </div>
</template>

<style scoped>
.company-source-page {
  min-height: 100vh;
  background: #f6f8fa;
}

:deep(.van-nav-bar__content) {
    background-color: #fff;
}

.company-header {
  position: relative;
  background: linear-gradient(135deg, #3a475a 0%, #2c3e50 100%);
  padding: 30px 20px;
  color: #fff;
  margin-bottom: 16px;
  overflow: hidden;
}

.info-content {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
}

.logo {
  width: 64px;
  height: 64px;
  border-radius: 12px;
  border: 2px solid rgba(255,255,255,0.3);
  margin-right: 16px;
  background: #fff;
}

.text-area {
  flex: 1;
}

.comp-name {
  font-size: 18px;
  margin: 0 0 8px 0;
  font-weight: 600;
}

.comp-sub {
  font-size: 12px;
  color: rgba(255,255,255,0.8);
  display: flex;
  align-items: center;
}

.divider {
  margin: 0 8px;
  opacity: 0.5;
}

.verify-tag {
  margin-left: 12px;
  align-self: flex-start;
  flex-shrink: 0;
  font-size: 10px;
  background: rgba(25, 137, 250, 0.2);
  border: 1px solid #1989fa;
  color: #66b1ff;
  padding: 2px 6px;
  border-radius: 4px;
}

.bg-shape {
  position: absolute;
  top: -50%;
  right: -20%;
  width: 200px;
  height: 200px;
  background: rgba(255,255,255,0.05);
  border-radius: 50%;
  z-index: 1;
}

.task-list-section {
  padding: 0 12px;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #333;
  padding-left: 4px;
}

.task-item {
  background: #fff;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.02);
}

.item-top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}
.item-name {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}
.item-salary {
  font-size: 16px;
  font-weight: 700;
  color: #ff9415;
}

.item-mid {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}
.tag {
  background: #f5f5f5;
  color: #666;
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 4px;
}

.item-bot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #f9f9f9;
  padding-top: 12px;
}
.poster {
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #666;
}
.mini-avatar {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 6px;
}
.time {
  font-size: 11px;
  color: #999;
}

.loading-box {
  display: flex;
  justify-content: center;
  padding: 20px;
}
</style>