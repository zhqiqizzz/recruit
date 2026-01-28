<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { getCityListApi } from '@/api/task';
import { useCityStore } from '@/store/task';
const router = useRouter();
const store = useCityStore();

const cityData = ref<any>({});
const showSidebar = ref(false);
// 生成右侧索引列表 ['热门', 'A', 'B', ...]
const indexList = computed(() => {
  return Object.keys(cityData.value);
});

const onIndexChange = (index: string | number) => {
  showSidebar.value = index !== '热门';
};

// 获取数据
const getCityList = async () => {
    const res = await getCityListApi();
    cityData.value = res; 
};

const leftBack = () => {
  router.back();
};

// 选择城市
const chooseCity = (cityName: string) => {
  store.setCity(cityName);
  router.back();
};

onMounted(() => {
  getCityList();
});
</script>

<template>
  <div class="city-page" :class="{ 'hide-sidebar': !showSidebar }">
    <van-nav-bar 
        title="选择城市" 
        left-arrow 
        @click-left="leftBack" 
        fixed 
        placeholder 
        class="custom-nav"
    />

    <div class="current-section">
        <h3 class="section-title">当前定位城市</h3>
        <div class="location-capsule">
            <van-icon name="location" color="#FE8F27" size="16px" />
            <span class="current-city-text">{{ store.cityValue }}</span>
        </div>
    </div>

    <van-index-bar 
        :index-list="indexList" 
        @change="onIndexChange" 
        highlight-color="#FE8F27"
    >
      <div v-for="(list, key) in cityData" :key="key">
        <van-index-anchor :index="key" class="custom-anchor" />

        <div v-if="key === '热门'" class="hot-city-grid">
             <span 
                v-for="city in list" 
                :key="city.code" 
                class="city-tag"
                @click="chooseCity(city.name)"
             >
                {{ city.name }}
             </span>
        </div>

        <div v-else>
            <van-cell 
                v-for="city in list" 
                :key="city.code" 
                :title="city.name" 
                clickable
                class="city-cell"
                @click="chooseCity(city.name)"
            />
        </div>
      </div>
    </van-index-bar>
  </div>
</template>

<style scoped>
.city-page {
  min-height: 100vh;
  background: #F7F8FA;
}

.custom-nav :deep(.van-nav-bar__content) {
    background-color: #fff;
}
.custom-nav :deep(.van-nav-bar__title) {
    font-weight: 600;
    color: #333;
}
.custom-nav :deep(.van-icon) {
    color: #333;
}

.section-title {
  font-size: 13px;
  color: #999;
  font-weight: 400;
  margin-bottom: 12px;
}

.current-section {
  background: #fff;
  padding: 16px;
  margin-bottom: 0;
}

.location-capsule {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: #FFF9F2;
    border: 1px solid #FE8F27;
    border-radius: 20px;
    padding: 6px 20px;
    min-width: 100px;
    transition: all 0.2s;
}

.location-capsule .van-icon {
    margin-right: 4px;
}

.current-city-text {
    font-size: 14px;
    font-weight: 600;
    color: #FE8F27;
}

.hot-city-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    padding: 12px 16px 20px;
    background: #fff;
}

.city-tag {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 36px;
    background: #F7F8FA;
    border-radius: 4px;
    font-size: 13px;
    color: #333;
    transition: background-color 0.2s;
}

.city-tag:active {
    background-color: #EFEFEF;
    color: #000;
}

.custom-anchor {
    background: #F7F8FA;
}
:deep(.van-index-anchor) {
    background: #F7F8FA;
    color: #999;
    font-size: 12px;
    padding: 8px 16px;
    line-height: 1.2;
}
:deep(.van-index-anchor--sticky) {
    color: #FE8F27;
    background-color: #FFF9F2;
}

.city-cell {
    font-size: 14px;
    color: #333;
    padding: 14px 16px;
}
.city-cell::after {
    left: 16px;
    right: 0;
}

:deep(.van-index-bar__sidebar) {
    right: 6px;
}

:deep(.van-index-bar__index) {
    font-size: 11px;
    line-height: 18px;
    color: #666;
    padding: 0 4px;
    font-weight: 500;
}

:deep(.van-index-bar__index--active) {
    color: #FE8F27;
    font-weight: 700;
    transform: scale(1.2);
    background-color: transparent;
}

:deep(.van-index-bar__sidebar) {
    transition: opacity 0.3s ease, transform 0.3s ease;
    opacity: 1;
    transform: translateY(-50%) translateX(0);
}

.hide-sidebar :deep(.van-index-bar__sidebar) {
    opacity: 0;
    pointer-events: none;
    transform: translateY(-50%) translateX(20px);
}
</style>