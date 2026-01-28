<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { usePositionStore } from '@/store/task';
import { getPositionTypeApi } from '@/api/task';
import { useRouter } from 'vue-router';
const router = useRouter();
const positionStore = usePositionStore();
const positionList = ref<any>([])
const activeIndex = ref(0);
const getPositionType = async () => {
    const res = await getPositionTypeApi();
    positionList.value = res;
    initActiveSidebar();
}
const leftBack = () => {
    router.back();
}
// 初始化侧边栏选中项：即已选中的职位类型所属的大类
const initActiveSidebar = () => {
    if(!positionStore.positionValue) return;
    const posIndex = positionList.value.findIndex((item: any) => {
        return item.children.some((child: any) => child.name === positionStore.positionValue)
    })
    if(posIndex !== -1){
        activeIndex.value = posIndex;
    }
}
const handleSidebarClick = (index: any) => {
    activeIndex.value = index;
}
const handleItemClick = (item: any) => {
    if(positionStore.positionValue === item.name) {
        positionStore.setPositionType('全部');
    } else {
        positionStore.setPositionType(item.name);
    }
    router.back();
}
onMounted(() => {
    getPositionType();
})
</script>
<template>
    <div class="page-container">
        <van-nav-bar title="职位类型" left-arrow @click-left="leftBack" fixed placeholder />
        <div class="position-type">
            <div class="position-type-left">
                <div 
                    v-for="(item, index) in positionList" 
                    :key="index"
                    class="sidebar-item"
                    :class="{ active: activeIndex === index }"
                    @click="handleSidebarClick(index)"
                >
                    <span class="sidebar-text">{{ item.name }}</span>
                </div>
            </div>

            <div class="position-type-right">
                <div class="category-title" v-if="positionList[activeIndex]">
                    {{ positionList[activeIndex].name }}
                </div>

                <div class="tags-container" v-if="positionList[activeIndex]">
                    <span 
                        v-for="(child, index) in positionList[activeIndex].children" 
                        :key="index"
                        class="tag-item"
                        :class="{ active: positionStore.positionValue === child.name }"
                        @click="handleItemClick(child)"
                    >
                        {{ child.name }}
                    </span>
                    <div v-if="!positionList[activeIndex].children?.length" class="empty-text">
                        暂无相关职位
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* 全局容器 */
.page-container {
    height: 100vh;
    display: flex;
    flex-direction: column;
    background: #fff;
    font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Segoe UI, Arial, Roboto, 'PingFang SC', sans-serif;
}

.position-type {
    display: flex;
    flex: 1;
    overflow: hidden;
    background: #fff;
}

/* === 左侧侧边栏 (橙色主题 & 布局修复) === */
.position-type-left {
    width: 96px; /* 侧边栏宽度 */
    background: #f8f9fa;
    overflow-y: auto;
    scrollbar-width: none;
}
.position-type-left::-webkit-scrollbar {
    display: none;
}

.sidebar-item {
    min-height: 50px;
    display: flex;
    align-items: center;
    justify-content: flex-start; 
    padding-left: 16px; 
    padding-right: 8px;
    font-size: 14px;
    color: #666;
    position: relative;
    transition: all 0.3s ease;
    cursor: pointer;
    line-height: 1.3;
}

.sidebar-item.active {
    background: #fff;
    color: #ff6600;
    font-weight: 500;
}

.sidebar-item.active::before {
    content: '';
    position: absolute;
    left: 4px; 
    top: 50%;
    transform: translateY(-50%);
    width: 4px;
    height: 18px;
    background-color: #ff6600;
    border-radius: 4px;
}

.position-type-right {
    flex: 1;
    background: #fff;
    padding: 16px 20px;
    overflow-y: auto;
}

.category-title {
    font-size: 14px;
    color: #333;
    margin-bottom: 16px;
    font-weight: 600;
}

.tags-container {
    display: flex;
    flex-wrap: wrap;
    gap: 12px 10px;
}

.tag-item {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0 16px;
    height: 32px;
    background: #fff;
    border: 1px solid #f0f0f0;
    border-radius: 16px;
    font-size: 13px;
    color: #666;
    min-width: 72px;
    box-sizing: border-box;
    transition: all 0.2s;
    cursor: pointer;
    max-width: 100%;
}

.tag-item.active {
    color: #ff6600; 
    border-color: #ff6600; 
    background-color: #fff5eb;
    font-weight: 500;
}

.tag-item:active {
    background-color: #fff5eb;
    transform: scale(0.98);
}

.empty-text {
    font-size: 13px;
    color: #ccc;
    text-align: center;
    padding-top: 40px;
}
</style>