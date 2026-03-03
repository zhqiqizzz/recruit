<script setup lang="ts">
import { ref } from 'vue';
import FooterTabbar from '@/components/FooterTabbar.vue';
import TaskList from '@/components/list/TaskList.vue';
import Banner from '@/views/Task/Components/Banner.vue';
import { useRouter } from 'vue-router';
import { useCityStore } from '@/store/task';
import { usePositionStore } from '@/store/task';
import { useScreenStore } from '@/store/task';
import { useTaskList } from '@/composables/useTaskList';
import TaskPopup from '@/views/Task/Components/TaskPopup.vue';
const router = useRouter();
const cityStore = useCityStore();
const positionStore = usePositionStore();
const screenStore = useScreenStore();

// 弹窗变量
const showCity = ref(false);
const showPosition = ref(false);
const showScreen = ref(false);

const { taskList, loading, finished, refreshing, onLoad, onRefresh, onResearch } = useTaskList(
    // 参数获取函数
    () => ({
        position_name: positionStore.positionValue === '全部' ? '' : positionStore.positionValue,
        city: cityStore.cityValue,
        service_mode: screenStore.serviceMode,
        task_cycle: screenStore.taskCycle,
        salary: screenStore.salary,
    }),
    [
        () => cityStore.cityValue, 
        () => positionStore.positionValue, 
    ]
)
</script>

<template>
  <div class="app-container">
    <div class="nav-header">
        <div class="header-row-1" @click="showCity = true">
            <van-icon name="location" color="#FF9800" size="16px" />
            <span class="city-text">{{ cityStore.cityValue }}</span>
            <van-icon name="arrow-down" color="#333" size="10px" class="icon-arrow" />
        </div>

        <div class="header-row-2">
            <div class="search-capsule" @click="() => router.push('/task/search')">
                <van-icon name="search" color="#A0A0A0" size="16px" class="icon-search" />
                <input type="text" readonly placeholder="请输入想要搜索的内容" />
            </div>
            
            <!-- TODO 有消息时才有小圆点dot -->
            <div class="message-btn" @click="() => router.push('/message/systemList')">
                 <van-icon name="bell" size="20" color="#333" dot />
            </div>
        </div>
    </div>

    <div class="content-body">
        <div class="banner-wrapper">
            <Banner />
        </div>
        <div class="section-header">
            <h3 class="section-title">最新任务</h3>
            <div class="filter-controls">
                <div class="filter-btn" @click="showPosition = true">
                    {{ positionStore.positionValue || '全部' }}
                    <van-icon name="arrow-down" color="#666" size="10px" style="margin-left: 3px;" />
                </div>
                <div class="filter-btn" @click="showScreen = true">
                    筛选
                    <van-icon name="filter-o" color="#666" size="12px" style="margin-left: 3px;" />
                </div>
            </div>
        </div>

        <van-pull-refresh v-model="refreshing" @refresh="onRefresh" class="list-wrapper" success-text="刷新成功">
          <van-list
            v-model:loading="loading"
            :finished="finished"
            :finished-text="taskList.length > 0 ? '没有更多了' : ''"
            @load="onLoad"
          >
            <TaskList :taskList="taskList" />
            <div v-if="taskList.length === 0 && !loading" class="empty-state">
                <van-empty description="暂无数据" />
            </div>
          </van-list>
        </van-pull-refresh>
    </div>
    <FooterTabbar />
    <TaskPopup 
      v-model:showCity="showCity"
      v-model:showPosition="showPosition"
      v-model:showScreen="showScreen"
      @finish="onResearch"
    />
  </div>
</template>

<style scoped>
  .app-container {
    background: #F5F7FA;
    min-height: 100vh;
    padding-bottom: 3.5rem;
    font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", Helvetica, Arial, sans-serif;
  }

  .nav-header {
      background: #FFFFFF;
      padding: 12px 16px 8px; 
      position: sticky;
      top: 0;
      z-index: 100;
  }

  .header-row-1 {
      display: flex;
      align-items: center;
      margin-bottom: 15px;
      line-height: 1;
  }

  .city-text {
      font-size: 15px;
      font-weight: 550;
      color: #333;
      margin: 0 5px;
      letter-spacing: 0.5px;
  }
  
  .icon-arrow {
      margin-top: 1px;
  }

  .header-row-2 {
      display: flex;
      align-items: center;
      justify-content: space-between;
  }

  .search-capsule {
      flex: 1;
      height: 36px;
      background: #F7F8FA;
      border-radius: 18px;
      display: flex;
      align-items: center;
      padding: 0 12px;
  }

  .icon-search {
      margin-right: 8px;
  }

  .search-capsule input {
      background: transparent;
      border: none;
      width: 100%;
      height: 100%;
      font-size: 13px;
      color: #333;
      padding: 0;
  }
  
  .search-capsule input::placeholder {
      color: #9CA3AF;
  }

  .message-btn {
      margin-left: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 20px; 
      height: 20px;
  }

  .red-dot {
      position: absolute;
      top: 0;
      right: 1px;
      width: 6px;
      height: 6px;
      background: #FF3B30;
      border-radius: 50%;
      border: 1px solid #fff;
  }

  .content-body {
      padding: 0 16px;
  }

  .banner-wrapper {
      margin-top: 8px;
      border-radius: 8px;
      overflow: hidden;
  }

  .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 20px 0 12px;
  }

  .section-title {
      font-size: 16px;
      font-weight: 700;
      color: #222;
  }

  .filter-controls {
      display: flex;
      gap: 16px;
  }

  .filter-btn {
      font-size: 13px;
      color: #666;
      display: flex;
      align-items: center;
  }

  .list-wrapper {
      min-height: 50vh;
  }
</style>