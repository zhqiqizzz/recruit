import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import type { taskItem } from '@/types/task';
import { useCityStore } from '@/store/task';
import { usePositionStore } from '@/store/task';
import { useScreenStore } from '@/store/task';
import { getTaskListApi } from '@/api/task';
export const useTaskList = () => {
  const router = useRouter();
  const cityStore = useCityStore();
  const positionStore = usePositionStore();
  const screenStore = useScreenStore();

  // 列表/加载状态响应式变量
  const taskList = ref<taskItem[]>([]);
  const loading = ref(false);     // 上拉加载状态
  const finished = ref(false);    // 是否已加载完所有数据
  const refreshing = ref(false);  // 下拉刷新状态
  const pageNum = ref(0);         // 当前页码
  const pageSize = 10;            // 每页条数（常量，无需响应式）

  // 弹窗控制变量
  const showCity = ref(false);
  const showPosition = ref(false);
  const showScreen = ref(false);

  const getTaskList = async () => {
    if (refreshing.value) {
      pageNum.value = 0;
    } else {
      pageNum.value++;
    }
    try {
      loading.value = true;
      const res = await getTaskListApi({
        city: cityStore.cityValue,
        position_name: positionStore.positionValue,
        service_mode: screenStore.serviceMode,
        task_cycle: screenStore.taskCycle,
        salary: screenStore.salary,
        pageNum: pageNum.value,
        pageSize: pageSize
      });
      if (refreshing.value) {
        taskList.value = res.records;
        refreshing.value = false;
      } else {
        taskList.value = [...taskList.value, ...res.records];
      }
      finished.value = taskList.value.length >= res.count;
    } catch (error) {
      loading.value = false;
      finished.value = true;
      refreshing.value = false;
    } finally {
      loading.value = false;
    }
  };

  // 上拉加载触发
  const onLoad = () => {
    getTaskList();
  };

  // 下拉刷新触发
  const onRefresh = () => {
    loading.value = true;
    finished.value = false;
    onLoad();
  };

  watch(() => cityStore.cityValue, () => {
    refreshing.value = true;
    onRefresh();
  });

  watch(() => positionStore.positionValue, () => {
    refreshing.value = true;
    onRefresh();
  });

  const onScreenConfirm = () => {
    showScreen.value = false;
    refreshing.value = true;
    onRefresh();
  };

  onMounted(() => getTaskList());

  return {
    // 列表/加载状态
    taskList,
    loading,
    finished,
    refreshing,
    // 弹窗控制
    showCity,
    showPosition,
    showScreen,
    // 交互方法
    onLoad,
    onRefresh,
    onScreenConfirm,
    router
  };
};