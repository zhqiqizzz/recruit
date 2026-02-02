import { ref, watch, type WatchSource } from 'vue';
import type { taskItem } from '@/types/task';
import { getTaskListApi } from '@/api/task';
export function useTaskList(getParams: () => any, watchSources: WatchSource[] = []) {
    const taskList = ref<taskItem[]>([])
    const pageNum = ref(0)
    const pageSize = ref(10)

    const loading = ref(false) // 上拉加载
    const finished = ref(false) // 数据加载完毕
    const refreshing = ref(false) // 下拉刷新
    
    const getTaskList = async () => {
        if(refreshing.value) {
            pageNum.value = 1
        } else {
            pageNum.value += 1
        }
        try {
            const res = await getTaskListApi({
                ...getParams(),
                pageNum: pageNum.value,
                pageSize: pageSize.value,
            })
            if(refreshing.value){
                taskList.value = res.records
                refreshing.value = false
            } else {
                taskList.value = [ ...taskList.value, ...res.records]
            }
            loading.value = false
            if(res.records.length < pageSize.value){
                finished.value = true
            }
        } catch (error) {
            loading.value = false
            finished.value = true
            refreshing.value = false
        }
    }

    // 上拉加载
    const onLoad =  () => {
        getTaskList()
    }

    // 下拉刷新
    const onRefresh = () => {
        finished.value = false
        loading.value = true
        onLoad()
    }

    const onResearch = () => {
        refreshing.value = true;
        onRefresh();
    }

    if(watchSources.length > 0){
        watch(watchSources, () => {
            refreshing.value = true
            onRefresh()
        })
    }
    return {
        taskList,
        loading,
        finished,
        refreshing,
        onResearch,
        onLoad,
        onRefresh,
    }
};