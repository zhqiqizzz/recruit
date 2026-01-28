<script setup lang="ts">
import type { taskItem } from '@/types/task';
import {useRouter} from 'vue-router'
const props = withDefaults(defineProps<{
    taskList: taskItem[]
}>(), {
    taskList: () => [],
    showCompany: true
});
const router = useRouter()
const gotoDetail = (id: any) =>{
    router.push(`/task/details/${id}`)
}
</script>
<template>
    <div class="job-card" v-for="(item, index) in props.taskList" :key="index" @click="gotoDetail(item.task_id)">
        <div class="card-head">
            <div class="head-left">
                <h3 class="job-title">{{ item.position_name }}</h3>
                <span v-if="item.is_emergency === 1" class="tag-urgent">急</span>
            </div>
            <span class="salary-text">¥{{ item.salary }} / 月</span>
        </div>

        <div class="card-tags">
            <span class="tag-item">{{ item.city }}{{ item.area ? `·${item.area}` : '' }}</span>
            <span class="tag-item">{{ item.task_cycle }}天周期</span>
            <span class="tag-item">{{ item.service_mode }}</span>
            <span v-if="item.task_grade" class="tag-item tag-grade">{{ item.task_grade }}</span>
        </div>

        <p class="task-ask" v-if="item.task_ask">{{ item.task_ask }}</p>

        <div class="card-foot">
            <div class="company-wrap">
                <img v-if="item.logo" :src="item.logo" class="company-logo" />
                <div v-else class="company-logo-text">
                    {{ item.company_name ? item.company_name.charAt(0) : '企' }}
                </div>
                
                <span class="company-name">{{ item.company_name }}</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.job-card {
    background: #FFFFFF;
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 10px;
    position: relative;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04); 
    border: none; 
}

.job-card:active {
    background-color: #F9F9F9;
}

.card-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    line-height: 1.4;
}

.head-left {
    display: flex;
    align-items: center;
    flex: 1;
    margin-right: 12px;
}

.job-title {
    font-size: 16px;
    font-weight: 600;
    color: #222;
    margin-right: 6px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 100%;
}

.tag-urgent {
    font-size: 12px;
    color: #FF4D4F;
    border: 1px solid rgba(255, 77, 79, 0.5);
    border-radius: 2px;
    padding: 0 2px;
    height: 14px;
    line-height: 13px;
    flex-shrink: 0;
}

.salary-text {
    font-size: 15px;
    color: #FF8800;
    font-weight: 600;
    font-family: -apple-system, BlinkMacSystemFont, "Roboto", sans-serif;
    flex-shrink: 0;
}

.card-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 12px;
}

.tag-item {
    background: #F7F8FA;
    color: #666;
    font-size: 12px;
    padding: 3px 6px;
    border-radius: 4px;
    line-height: 1.4;
}

.tag-grade {
    background: #F0F9FF;
    color: #007AFF;
}

.task-ask {
    font-size: 13px;
    color: #666;
    line-height: 1.5;
    margin-bottom: 12px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
}

.card-foot {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.company-wrap {
    display: flex;
    align-items: center;
}

.company-logo {
    width: 20px;
    height: 20px;
    border-radius: 4px;
    margin-right: 6px;
    object-fit: cover;
}

.company-logo-text {
    width: 20px;
    height: 20px;
    border-radius: 4px;
    margin-right: 6px;
    background: #E0E0E0;
    color: #FFF;
    font-size: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.company-name {
    font-size: 12px;
    color: #888;
    font-weight: 400;
    max-width: 180px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>