<script setup lang="ts">
import { ref,onMounted, watch, computed, onBeforeUnmount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import TaskList from '@/components/list/TaskList.vue';
import { useCityStore } from '@/store/task';
import { usePositionStore } from '@/store/task';
import { useScreenStore } from '@/store/task';
import TaskPopup from '@/views/Task/Components/TaskPopup.vue';
import { useTaskList } from '@/composables/useTaskList';

const route = useRoute();
const router = useRouter();
const keyword = ref(route.query.keyword || '');

const cityStore = useCityStore();
const positionStore = usePositionStore();
const screenStore = useScreenStore();

const sortType = ref(0);
const sortOptions = ref([
    { text: '默认排序', value: 0 },
    { text: '薪资排序', value: 1 },
    { text: '周期排序', value: 2 },
]);


// 弹窗变量
const showCity = ref(false);
const showPosition = ref(false);
const showScreen = ref(false);

const { taskList, loading, finished, refreshing, onLoad, onRefresh, onResearch } = useTaskList(
    // 参数获取函数
    () => ({
        position_name: keyword.value || positionStore.positionValue,
        city: cityStore.cityValue,
        service_mode: screenStore.serviceMode,
        task_cycle: screenStore.taskCycle,
        salary: screenStore.salary,
        sortType: sortType.value
    }),
    [
        () => cityStore.cityValue, 
    ]
)

watch(() => positionStore.positionValue, () => {
    keyword.value = '' ;
    onResearch();
});

const soeredTaskList = computed(() => {
    const list = [...taskList.value]
    if(sortType.value === 1){
        list.sort((a, b) => b.task_budget - a.task_budget)
    } else if(sortType.value === 2){
        list.sort((a, b) => a.task_cycle - b.task_cycle)
    }
    return list;
})

const onClickLeft = () => router.back()
const onSearchClick = () => router.replace('/task/search')
onMounted(() => {
    if(keyword.value){
        positionStore.setPositionType('全部')
        screenStore.setSalary('')
        screenStore.setServiceMode('')
        screenStore.setTaskCycle('')
    }
    onLoad()
})
onBeforeUnmount(() => {
    positionStore.setPositionType('全部')
    screenStore.setSalary('')
    screenStore.setServiceMode('')
    screenStore.setTaskCycle('')
})
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
            <div class="filter-item dropdown-wrapper">
                <van-dropdown-menu active-color="#FE8F27">
                    <van-dropdown-item v-model="sortType" :options="sortOptions" />
                </van-dropdown-menu>
            </div>
        </div>
    </div>

    <div class="content-body">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh" success-text="刷新成功">
        <van-list
          v-model:loading="loading"
          :finished="finished"
          success-text="刷新成功"
          :finished-text="taskList.length > 0 ? '没有更多了' : ''"
          @load="onLoad"
        >
          <TaskList :taskList="soeredTaskList" />
          <div v-if="taskList.length === 0 && !loading" class="empty-state">
             <van-empty image="search" description="没有找到相关职位" />
          </div>
        </van-list>
      </van-pull-refresh>
    </div>

    <!-- v-model:propName 就是 :propName 和 @update:propName -->
    <!-- :propName 给子组件传递一个名为 propName 的 props -->
    <!-- @update:propName 监听子组件一个名为 update:propName 的自定义事件 -->
    <TaskPopup 
      v-model:showCity="showCity"
      v-model:showPosition="showPosition"
      v-model:showScreen="showScreen"
      @finish="onResearch"
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
    min-width: 0;
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
.dropdown-wrapper {
    flex: 1; 
}
.content-body {
  flex: 1;
  padding: 0 16px;
  margin-top: 10px;
}

:deep(.van-dropdown-menu) {
    height: 40px;
    background: transparent;
}
:deep(.van-dropdown-menu__bar) {
    height: 40px;
    box-shadow: none;
    background: transparent;
}
:deep(.van-dropdown-menu__item) {
    justify-content: center;
}
:deep(.van-dropdown-menu__title) {
    font-size: 13px;
    color: #666;
    padding: 0 8px;
}
:deep(.van-dropdown-menu__title--active) {
    color: #FE8F27;
}
:deep(.van-dropdown-item__option--active) {
    color: #FE8F27;
}
:deep(.van-dropdown-item__icon) {
    color: #FE8F27;
}
</style>