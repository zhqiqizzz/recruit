<script setup lang="ts">
import { ref,onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getTaskListApi } from '@/api/task';
import type { taskItem } from '@/types/task';
import TaskList from '@/components/list/TaskList.vue';
import CitySwitch from '@/components/CitySwitch.vue';
import PositionType from '@/components/PositionType.vue';
import Screen from '@/components/Screen.vue';
import { useCityStore } from '@/store/task';
import { usePositionStore } from '@/store/task';
import { useScreenStore } from '@/store/task';
const route = useRoute();
const router = useRouter();
const keyword = route.query.keyword || '';
const cityStore = useCityStore();
const positionStore = usePositionStore();
const screenStore = useScreenStore();
const taskList = ref<taskItem[]>([]);
const loading = ref(false); // 上拉加载
const finished = ref(false);
const refreshing = ref(false); // 下拉刷新
const pageNum = ref(0);
const pageSize = 10;

const sortOptions = ref([
    { name: '默认排序', value: 0 },
    { name: '薪资排序', value: 1 },
    { name: '时间排序', value: 2 },
]);
const sortType = ref(0); // 默认排序

// 弹窗变量
const showCity = ref(false);
const showPosition = ref(false);
const showScreen = ref(false);
const showSort = ref(false);
const getTaskList = async () => {
    if(refreshing.value){
        pageNum.value = 0
    } else {
        pageNum.value++
    }
    try {
        const res = await getTaskListApi({
            city: cityStore.cityValue,
            position_name: positionStore.positionValue,
            service_mode: screenStore.serviceMode,
            task_cycle: screenStore.taskCycle,
            salary: screenStore.salary,
            pageNum: pageNum.value,
            pageSize: pageSize
        })
        if(refreshing.value){
            taskList.value = res.records
            refreshing.value = false;
        } else {
            taskList.value = [...taskList.value, ...res.records]
        }
        loading.value = false;
        if(taskList.value.length >= res.count){
            finished.value = true;
        }
    } catch (error) {
        loading.value = false;
        refreshing.value = false;
        finished.value = true;
    }
}

const onLoad = () => {
    getTaskList();
}

const onRefresh = () => {
  finished.value = false;
  loading.value = true;
  onLoad();
};

watch(() => cityStore.cityValue, () => {
    // 模拟一次“下拉刷新”动作
    refreshing.value = true; 
    onRefresh(); 
});

const onScreenConfirm = () => {
    showScreen.value = false;
    refreshing.value = true;
    onRefresh();
}

const onClickLeft = () => router.back()
const onSearchClick = () => router.replace('/task/search')

const onSortSelect = (action: any) => {
    sortType.value = action.value;
    showSort.value = false;
    refreshing.value = true;
    onRefresh();
}
onMounted(() => getTaskList())
</script>

<template>
  <div class="result-page">
    
    <div class="header-section">
        <div class="nav-header">
            <van-icon name="arrow-left" size="22" color="#333" @click="onClickLeft" class="left-icon" />
            <div class="search-capsule" @click="onSearchClick">
                <van-icon name="search" color="#999" size="16px" class="icon-search" />
                <span class="keyword-text">{{ keyword }}</span>
            </div>
            <div class="right-placeholder"></div> 
        </div>

        <div class="filter-bar">
            <div class="filter-item" @click="showCity = true">
                <span class="text">{{ cityStore.cityValue }}</span>
                <van-icon name="arrow-down" color="#666" size="10px" />
            </div>
            <div class="filter-item" @click="showPosition = true">
                <span class="text">职位类别</span>
                <van-icon name="arrow-down" color="#666" size="10px" />
            </div>
            <div class="filter-item" @click="showScreen = true">
                <span class="text">筛选</span>
                <van-icon name="filter-o" color="#666" size="12px" />
            </div>
            <div class="filter-item" @click="showSort = true">
                <span class="text">{{ sortOptions[sortType]?.name }}</span>
                <van-icon name="arrow-down" color="#666" size="10px" />
            </div>
        </div>
    </div>

    <div class="content-body">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <TaskList :taskList="taskList" />
          <div v-if="taskList.length === 0 && !loading" class="empty-state">
             <van-empty image="search" description="没有找到相关职位" />
          </div>
        </van-list>
      </van-pull-refresh>
    </div>

    <van-popup v-model:show="showCity" position="right" :style="{ width: '100%', height: '100%' }">
        <CitySwitch @close="showCity = false" />
    </van-popup>

    <van-popup v-model:show="showPosition" position="right" :style="{ width: '100%', height: '100%' }">
        <PositionType @close="showPosition = false" />
    </van-popup>

    <van-popup v-model:show="showScreen" position="right" :style="{ width: '80%', height: '100%' }">
        <Screen @close="showScreen = false" @confirm="onScreenConfirm" />
    </van-popup>

    <van-action-sheet
      v-model:show="showSort"
      :actions="sortOptions"
      @select="onSortSelect"
      description="请选择排序方式"
      close-on-click-action
    />
  </div>
</template>

<style scoped>
.result-page {
  min-height: 100vh;
  background: #F5F7FA;
  display: flex;
  flex-direction: column;
}

.header-section {
    background: #fff;
    position: sticky;
    top: 0;
    z-index: 100;
    box-shadow: 0 1px 4px rgba(0,0,0,0.05);
}

.nav-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
}
.search-capsule {
  flex: 1;
  height: 34px;
  background: #F7F8FA;
  border-radius: 17px;
  display: flex;
  align-items: center;
  padding: 0 12px;
  margin: 0 12px;
}
.keyword-text {
  font-size: 14px;
  color: #333;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.icon-search { margin-right: 6px; }
.right-placeholder { width: 22px; }

.filter-bar {
    display: flex;
    align-items: center;
    height: 40px;
    border-top: 1px solid #f5f5f5;
}

.filter-item {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    color: #666;
    height: 100%;
}
.filter-item:active {
    background-color: #f9f9f9;
}
.filter-item .text {
    margin-right: 4px;
    max-width: 60px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.content-body {
  flex: 1;
  padding: 0 16px;
  margin-top: 10px;
}
</style>