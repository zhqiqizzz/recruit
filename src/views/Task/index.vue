<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import FooterTabbar from '@/components/FooterTabbar.vue';
import TaskList from '@/components/list/TaskList.vue';
import type { taskItem } from '@/types/task';
import Banner from '@/views/Task/Components/Banner.vue';
import { useRouter } from 'vue-router';
import { useCityStore } from '@/store/task';
import { usePositionStore } from '@/store/task';
import { useScreenStore } from '@/store/task';
import { getTaskListApi } from '@/api/task';
const router = useRouter();
const cityStore = useCityStore();
const positionStore = usePositionStore();
const screenStore = useScreenStore();
const taskList = ref<taskItem[]>([]);
const loading = ref(false);     // 上拉加载状态
const finished = ref(false);    // 是否已加载完所有数据
const refreshing = ref(false);  // 下拉刷新状态
const pageNum = ref(0);         // 当前页码
const pageSize = 10;            // 每页条数
const getTaskList = async () => {
    if(refreshing.value) {
      pageNum.value = 0;
    } else {
      pageNum.value++
    }
    try{
      const res = await getTaskListApi({
        city: cityStore.cityValue,
        position_name: positionStore.positionValue,
        service_mode: screenStore.serviceMode,
        task_cycle: screenStore.taskCycle,
        salary: screenStore.salary,
        pageNum: pageNum.value,
        pageSize: pageSize
      })
      // 判断是下拉刷新还是上拉加载
      if(refreshing.value){
        taskList.value = res.records;
        refreshing.value = false;
      } else {
        taskList.value = [...taskList.value, ...res.records];
      }
      // 设置加载状态
      loading.value = false;
      if(taskList.value.length >= res.count){
        finished.value = true;
      }

    } catch (error) {
      loading.value = false;
      finished.value = true;
      refreshing.value = false;
    }
}

// 触发底部加载
const onLoad = () => {
    getTaskList();
}
const onRefresh = () => {
    loading.value = true;
    finished.value = false;
    onLoad();
}
watch(() => cityStore.cityValue, () => {
    // 模拟一次“下拉刷新”动作
    refreshing.value = true; 
    onRefresh(); 
});

// 监听职位变化
watch(() => positionStore.positionValue, () => {
    refreshing.value = true;
    onRefresh();
});
onMounted(() => getTaskList())
</script>

<template>
  <div class="app-container">
    <div class="nav-header">
        <div class="header-row-1" @click="() => router.push('/task/city/list')">
            <van-icon name="location" color="#FF9800" size="16px" />
            <span class="city-text">{{ cityStore.cityValue }}</span>
            <van-icon name="arrow-down" color="#333" size="10px" class="icon-arrow" />
        </div>

        <div class="header-row-2">
            <div class="search-capsule">
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
                <div class="filter-btn" @click="() => router.push('/task/position/type')">
                    {{ positionStore.positionValue || '全部' }}
                    <van-icon name="arrow-down" color="#666" size="10px" style="margin-left: 3px;" />
                </div>
                <div class="filter-btn" @click="() => router.push('/task/screen')">
                    筛选
                    <van-icon name="filter-o" color="#666" size="12px" style="margin-left: 3px;" />
                </div>
            </div>
        </div>

        <van-pull-refresh v-model="refreshing" @refresh="onRefresh" class="list-wrapper">
          <van-list
            v-model:loading="loading"
            :finished="finished"
            finished-text="没有更多了"
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