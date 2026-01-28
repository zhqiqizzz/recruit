<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';
import { getTaskDetailApi } from '@/api/task';
import { Toast } from 'vant';
const router = useRouter();
const route = useRoute();
const detail = ref<any>({});
const loading = ref(true);
const isCollected = ref(false);
const showShare = ref(false);
const toggleCollect = () => {
  isCollected.value = !isCollected.value;
  Toast(isCollected.value ? '已收藏' : '取消收藏');
};
const getTaskDetail = async () => {
    const taskId = route.params.id;
    const res = await getTaskDetailApi(taskId);
    detail.value = res;
}
const onClickLeft = () => {
  router.back();
}
// TODO 开发沟通和投递简历功能
const handleChat = () => {
  alert('沟通功能待开发');
}
const handleApply = () => {
  alert('投递简历功能待开发');
}
const options = [
    [
        { name: '微信', icon: 'wechat' },
        { name: '朋友圈', icon: 'wechat-moments' },
        { name: '微博', icon: 'weibo' },
        { name: 'QQ', icon: 'qq' },
    ],
    [
        { name: '复制链接', icon: 'link' },
        { name: '分享海报', icon: 'poster' },
        { name: '二维码', icon: 'qrcode' },
        { name: '小程序码', icon: 'weapp-qrcode' },
    ],
];
const onSelect = (option: any) => {
    Toast(option.name);
    showShare.value = false;
};
onMounted(() => {
  getTaskDetail();
  setTimeout(() => {
    loading.value = false;
  }, 500);
});
</script>
<template>
  <div class="task-detail-page">
    
    <van-nav-bar
      title="职位详情"
      left-arrow
      fixed
      placeholder
      @click-left="onClickLeft"
      class="custom-nav"
    />

    <div v-if="loading" class="skeleton-wrapper">
      <van-skeleton title :row="3" class="mb-20" />
      <van-skeleton avatar :row="2" class="mb-20" />
      <van-skeleton title :row="8" />
    </div>

    <div v-else-if="detail" class="detail-content">
      
      <div class="header-section">
        <div class="title-row">
          <h1 class="task-title">{{ detail.task_name }}</h1>
          <span class="salary">￥{{ detail.salary }} / 月</span>
        </div>
        <span class="position-name">{{ detail.position_name }}</span>
        <div class="tags-row">
          <div class="tag-item"><van-icon name="location-o" /> {{ detail.city }} · {{ detail.area }}</div>
          <div class="tag-item"><van-icon name="clock-o" /> {{ detail.task_cycle }}天周期</div>
          <div class="tag-item"><van-icon name="bag-o" /> {{ detail.service_mode }}</div>
        </div>
        
        <div class="badges-row" v-if="detail.is_emergency === 1">
           <span class="badge-tag emergency">
             <van-icon name="fire-o" /> 急需人员
           </span>
           <span class="badge-tag normal">{{ detail.service_mode }}办公</span>
        </div>
      </div>

      <div class="recruiter-card" @click="router.push(`/task/companySource/${detail.user_id}`)">
        <div class="avatar-box">
          <img :src="detail.head_img || detail.it_head" class="avatar" alt="头像" />
          <div class="verified-badge"><van-icon name="success" /></div>
        </div>
        <div class="recruiter-info">
          <div class="row-1">
            <span class="name">{{ detail.user_name }}</span>
            <span class="active-tag" v-show="detail.status">刚刚活跃</span>
          </div>
          <div class="row-2">
            {{ detail.company_name }} · 人力资源
          </div>
        </div>
        <div class="action-arrow">
            <van-icon name="arrow" />
        </div>
      </div>

      <div class="desc-section">
        <h3 class="section-title">职位描述</h3>
        
        <div class="skill-tags">
            <span class="skill">{{ detail.task_grade }}</span>
        </div>

        <div class="rich-text">
          {{ detail.task_ask }}
        </div>
      </div>

      <div class="safety-tips">
        <van-icon name="shield-o" class="shield-icon" />
        <div class="tips-text">
            <p class="tips-title">安全提示</p>
            <p class="tips-desc">本平台承诺不收取任何费用。若对方要求缴纳押金、培训费等，请立即举报。</p>
        </div>
      </div>

      <div class="bottom-safe-area"></div>
    </div>

    <van-empty v-else image="search" description="任务不存在或已下架" />

    <div class="footer-bar">
      <div class="action-area">
        <div class="icon-btn"  @click="showShare = true">
          <van-icon name="share-o" />
          <span>分享</span>
        </div>
        <div class="icon-btn" @click="toggleCollect" :class="{ active: isCollected }">
          <van-icon :name="isCollected ? 'star' : 'star-o'" />
          <span>{{ isCollected ? '已收藏' : '收藏' }}</span>
        </div>
      </div>
      
      <div class="btn-group">
        <button class="btn btn-chat" @click="handleChat">立即沟通</button>
        <button class="btn btn-apply" @click="handleApply">投递简历</button>
      </div>
    </div>
    <van-share-sheet
        v-model:show="showShare"
        title="立即分享给好友"
        :options="options"
        @select="onSelect"
      />
  </div>
</template>

<style scoped>
.task-detail-page {
  background-color: #f6f8fa;
  min-height: 100vh;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
  font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Helvetica Neue", Arial, sans-serif;
}

:deep(.van-nav-bar__content) {
    background-color: #fff;
}
:deep(.van-hairline--bottom:after) {
    border-bottom-width: 0;
}

.detail-content {
  padding: 12px;
}

.header-section {
  background: #fff;
  padding: 20px 16px;
  border-radius: 12px;
  margin-bottom: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.02);
}

.title-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
}

.position-name {
    display: block;
    font-size: 15px;
    font-weight: 550;
    color: #5c5858;
    margin-bottom: 12px;
    line-height: 1.4;
}

.task-title {
  font-size: 20px;
  font-weight: 700;
  color: #1a1a1a;
  line-height: 1.4;
  flex: 1;
  margin: 0;
  margin-right: 12px;
}

.salary {
  font-size: 18px;
  color: #FF8800;
  font-weight: 800;
  white-space: nowrap;
  font-family: DINAlternate-Bold, sans-serif;
}

.tags-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}

.tag-item {
  display: flex;
  align-items: center;
  gap: 4px;
  background: #f7f8fa;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  color: #666;
}

.badges-row {
  display: flex;
  gap: 8px;
}
.badge-tag {
    font-size: 11px;
    padding: 2px 6px;
    border-radius: 4px;
}
.badge-tag.emergency {
    background: #fff0f0;
    color: #ff4d4f;
    display: flex;
    align-items: center;
    gap: 2px;
}
.badge-tag.normal {
    background: #f0f9eb;
    color: #52c41a;
}


.recruiter-card {
  background: linear-gradient(to right, #ffffff, #fcfcfc);
  padding: 16px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.02);
  position: relative;
  overflow: hidden;
}

.avatar-box {
  position: relative;
  margin-right: 12px;
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid #f0f0f0;
}

.verified-badge {
  position: absolute;
  bottom: 0;
  right: 0;
  background: #1989fa;
  color: #fff;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  border: 1px solid #fff;
}

.recruiter-info {
  flex: 1;
}

.row-1 {
  display: flex;
  align-items: center;
  margin-bottom: 4px;
}

.name {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-right: 8px;
}

.active-tag {
  font-size: 10px;
  color: #85a5ff;
  background: #f0f5ff;
  padding: 1px 4px;
  border-radius: 2px;
}

.row-2 {
  font-size: 13px;
  color: #888;
}

.action-arrow {
    color: #ccc;
}

.desc-section {
  background: #fff;
  padding: 20px 16px;
  border-radius: 12px;
  margin-bottom: 12px;
}

.section-title {
  font-size: 16px;
  font-weight: 700;
  color: #222;
  margin: 0 0 16px 0;
}

.skill-tags {
    margin-bottom: 16px;
    display: flex;
    gap: 8px;
}
.skill {
    font-size: 12px;
    color: #1989fa;
    background: #e6f7ff;
    padding: 4px 10px;
    border-radius: 100px;
}

.rich-text {
  font-size: 14px;
  color: #555;
  line-height: 1.8;
  white-space: pre-wrap;
  word-break: break-all;
  text-align: justify;
}

.safety-tips {
  background: #f0f9ff;
  border-radius: 8px;
  padding: 12px;
  display: flex;
  gap: 10px;
  align-items: flex-start;
}

.shield-icon {
    font-size: 18px;
    color: #1989fa;
    margin-top: 2px;
}

.tips-title {
    font-size: 13px;
    font-weight: 600;
    color: #1989fa;
    margin: 0 0 4px 0;
}

.tips-desc {
    font-size: 12px;
    color: #666;
    margin: 0;
    line-height: 1.5;
}

.bottom-safe-area { height: 80px; }

.footer-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(10px);
  border-top: 1px solid #f5f5f5;
  padding: 8px 16px;
  padding-bottom: calc(8px + env(safe-area-inset-bottom));
  display: flex;
  align-items: center;
  z-index: 100;
  box-shadow: 0 -4px 16px rgba(0,0,0,0.05);
}

.action-area {
  display: flex;
  gap: 24px;
  margin-right: 20px;
}

.icon-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 10px;
  color: #666;
  gap: 2px;
  transition: transform 0.1s;
}
.icon-btn:active {
    transform: scale(0.9);
}
.icon-btn .van-icon {
    font-size: 22px;
    color: #333;
}
.icon-btn.active .van-icon,
.icon-btn.active span {
    color: #ff9415;
}

.btn-group {
    flex: 1;
    display: flex;
    gap: 12px;
}

.btn {
  flex: 1;
  height: 40px;
  border: none;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
}
.btn:active {
    opacity: 0.85;
}

.btn-chat {
  background: #eef2f5;
  color: #333;
}

.btn-apply {
  background: linear-gradient(135deg, #ff9a44 0%, #fcdf60 100%);
  color: #fff;
  box-shadow: 0 4px 12px rgba(25, 137, 250, 0.3);
}

.skeleton-wrapper {
    padding: 20px;
    background: #fff;
    margin-top: 12px;
}
.mb-20 { margin-bottom: 20px; }
</style>