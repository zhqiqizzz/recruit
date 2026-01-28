<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import { getTaskScreenApi, type ScreenDictItem } from '@/api/task';
import { useScreenStore } from '@/store/task';
const screenStore = useScreenStore();
const serviceModeList = ref<ScreenDictItem[]>([]);
const taskCycleList = ref<ScreenDictItem[]>([]);
const salaryList = ref<ScreenDictItem[]>([]);
const modeValue = ref(screenStore.serviceMode);
const cycleValue = ref(screenStore.taskCycle);
const salaryValue = ref(screenStore.salary);
const router = useRouter();
const onClickLeft = () => {
    router.back();
}
const getScreenData = async () => {
    const res = await getTaskScreenApi();
    serviceModeList.value = res.serviceMode;
    taskCycleList.value = res.taskCycle;
    salaryList.value = res.salary;
}
const handleModeClick = (value: string) => {
    if(modeValue.value === value){
        modeValue.value = '';
    } else {
        modeValue.value = value;
    }
}
const handleCycleClick = (value: string) => {
    if(cycleValue.value === value){
        cycleValue.value = '';
    } else {
        cycleValue.value = value;
    }
}

const handleSalaryClick = (value: string) => {
    if(salaryValue.value === value){
        salaryValue.value = '';
    } else {
        salaryValue.value = value;
    }
}
const handleClear = () => {
    modeValue.value = '';
    cycleValue.value = '';
    salaryValue.value = '';
    screenStore.setServiceMode('');
    screenStore.setTaskCycle('');
    screenStore.setSalary('');
}
const handleConfirm = () => {
    screenStore.setServiceMode(modeValue.value);
    screenStore.setTaskCycle(cycleValue.value);
    screenStore.setSalary(salaryValue.value);
    router.back();
}
onMounted(() => {
    getScreenData();
});
</script>

<template>
    <div class="screen-page">
        <div class="screen-header">
            <van-nav-bar title="筛选条件" left-arrow @click="onClickLeft" fixed placeholder />
            <h3>筛选条件</h3>
            <div class="header-right"></div>
        </div>

        <div class="screen-content">
            
            <div class="screen-block">
                <div class="block-header">
                    <span class="title">服务方式</span>
                    <span class="subtitle">Service Mode</span>
                </div>
                <div class="block-list">
                    <span 
                        v-for="(item, index) in serviceModeList" 
                        :key="index"
                        class="tag-item"
                        :class="{ active: modeValue === item.value }"
                        @click="handleModeClick(item.value)"
                    >
                        {{ item.label }}
                    </span>
                    <div v-if="serviceModeList.length === 0" class="loading-state">
                        <span class="loading-line"></span>
                    </div>
                </div>
            </div>

            <div class="screen-block">
                <div class="block-header">
                    <span class="title">任务周期</span>
                    <span class="subtitle">Duration</span>
                </div>
                <div class="block-list">
                    <span 
                        v-for="(item, index) in taskCycleList" 
                        :key="index"
                        class="tag-item"
                        :class="{ active: cycleValue === item.value }"
                        @click="handleCycleClick(item.value)"
                    >
                        {{ item.label }}
                    </span>
                    <div v-if="taskCycleList.length === 0" class="loading-state">
                         <span class="loading-line"></span>
                    </div>
                </div>
            </div>

            <div class="screen-block">
                <div class="block-header">
                    <span class="title">基础薪资</span>
                    <span class="subtitle">Salary Range</span>
                </div>
                <div class="block-list">
                    <span 
                        v-for="(item, index) in salaryList" 
                        :key="index"
                        class="tag-item" 
                        :class="{ active: salaryValue === item.value }"
                        @click="handleSalaryClick(item.value)"
                    >
                        {{ item.label }}
                    </span>
                    <div v-if="salaryList.length === 0" class="loading-state">
                         <span class="loading-line"></span>
                    </div>
                </div>
            </div>

            <div class="bottom-spacer"></div>
        </div>

        <div class="screen-footer">
            <div class="footer-inner">
                <button class="btn btn-clear" @click="handleClear">重置</button>
                <button class="btn btn-confirm" @click="handleConfirm">确认筛选</button>
            </div>
        </div>  
    </div>
</template>

<style scoped>
.screen-page {
    background-color: #FFFFFF;
    height: 100vh;
    display: flex;
    flex-direction: column;
    font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
    -webkit-font-smoothing: antialiased; 
}

.screen-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
    height: 40px;
    background: rgba(255, 255, 255, 0.95);
    position: sticky;
    top: 0;
    z-index: 50;
    box-shadow: inset 0 -0.5px 0 #EBEDF0; 
    backdrop-filter: blur(10px);
}

.header-left {
    font-size: 0.85rem;
    color: #555;
    font-weight: 400;
}

.screen-header h3 {
    font-size: 0.95rem; 
    font-weight: 600;
    color: #222;
}
.header-right { width: 2rem; }

.screen-content {
    flex: 1;
    padding: 0.2rem 1rem;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
}
.screen-content::-webkit-scrollbar { display: none; }

.screen-block {
    margin-top: 1.6rem;
}

.block-header {
    display: flex;
    align-items: baseline;
    margin-bottom: 0.8rem;
}
.block-header .title {
    font-size: 0.88rem; 
    font-weight: 600;
    color: #222;
    margin-right: 0.5rem;
}
.block-header .subtitle {
    font-size: 0.65rem; 
    font-weight: 400;
    color: #B0B0B0;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.block-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr); 
    gap: 0.65rem;
}

.tag-item {
    height: 2rem; 
    display: flex;
    justify-content: center;
    align-items: center;
    
    font-size: 0.75rem; 
    color: #555;
    
    background: #F7F8FA; 
    border-radius: 4px;
    border: 1px solid #F7F8FA; 
    
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
}

.tag-item.active {
    background: rgba(255, 148, 21, 0.08); 
    border-color: #FF9415;
    color: #FF9415;
    font-weight: 550;
}

.loading-state {
    grid-column: 1 / -1;
    padding: 0.4rem 0;
}
.loading-line {
    display: block;
    width: 50%;
    height: 0.8rem;
    background: #f5f5f5;
    border-radius: 4px;
    animation: pulse 1.5s infinite;
}

.bottom-spacer { height: 4rem; }

.screen-footer {
    position: fixed;
    bottom: 20px;
    left: 0;
    width: 100%;
    background: #fff;
    box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.04); 
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
    z-index: 100;
}

.footer-inner {
    padding: 0.6rem 1rem; 
    display: flex;
    gap: 0.8rem;
}

.btn {
    border: none;
    height: 2.4rem; 
    border-radius: 6px; 
    font-size: 0.82rem; 
    font-weight: 550;
    cursor: pointer;
    letter-spacing: 0.5px;
}

.btn-clear {
    flex: 1;
    background: #F5F7FA;
    color: #606266;
}

.btn-confirm {
    flex: 2;
    background: linear-gradient(135deg, #FFAA40 0%, #FF9415 100%);
    color: #fff;
    box-shadow: 0 4px 12px rgba(255, 148, 21, 0.2);
}
.btn-confirm:active { transform: scale(0.99); }
</style>