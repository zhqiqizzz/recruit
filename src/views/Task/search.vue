<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Dialog } from 'vant';
import { useSearchStore } from '@/store/task';
import { getHotSearchApi } from '@/api/task';
const router = useRouter();
const searchText = ref('');
const searchStore = useSearchStore();
const handleSearch = (keywords: string) => {
    if(!keywords.trim()) return;
    searchText.value = keywords;
    searchStore.addHistory(keywords);
    router.replace({ path: '/task/searchResult', query: { keyword: keywords } });
}

const hotList = ref<any[]>([]);
const getHotSearch = async () => {
    const res = await getHotSearchApi();
    hotList.value = res;
}
const clearHistory = () => {
    Dialog.confirm({
        title: '提示',
        message: '确认删除全部历史记录吗？',
    })
    .then(() => {
      searchStore.clearHistory();
    })
    .catch(() => {
      // 取消操作
    });
}
onMounted(() => {
    getHotSearch();
});
</script>
<template>
  <div class="search-page">
    <van-search
      v-model="searchText"
      show-action
      shape="round"
      placeholder="搜索职位 / 公司"
      @search="handleSearch"
    >
      <template #left>
        <van-icon 
          name="arrow-left" 
          size="18px" 
          color="#333"
          style="margin-right: 12px" 
          @click="router.back()" 
        />
      </template>

      <template #action>
        <div style="font-size:16px; color: #ff6b00;" @click="handleSearch(searchText)">搜索</div>
      </template>
    </van-search>

    <div class="content-body">
      <div v-if="searchStore.historyList.length > 0" class="section-block">
        <div class="section-header">
          <span class="title">历史搜索</span>
          <van-icon name="delete-o" class="icon-delete" @click="clearHistory" />
        </div>
        <div class="tags-wrapper">
          <span 
            v-for="(item, index) in searchStore.historyList" 
            :key="index" 
            class="tag history-tag"
            @click="handleSearch(item)"
          >
            {{ item }}
          </span>
        </div>
      </div>

      <div class="section-block">
        <div class="section-header">
          <span class="title">热门搜索</span>
        </div>
        <div class="tags-wrapper">
          <span 
            v-for="(item, index) in hotList" 
            :key="index" 
            class="tag hot-tag"
            :class="{ 'top-three': index < 3 }"
            @click="handleSearch(item.title)"
          >
            <van-icon v-if="index < 3" name="fire" class="rank-icon" />
            {{ item.title }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.search-page {
  min-height: 100vh;
  background-color: #fff;
}

:deep(.van-search__action) {
  color: #333;
  font-weight: 500;
  cursor: pointer;
}

:deep(.van-search__action:active) {
  opacity: 0.7;
}

.content-body {
  padding: 0 16px;
}

.section-block {
  margin-top: 24px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.title {
  font-size: 15px;
  font-weight: 600;
  color: #222;
}

.icon-delete {
  font-size: 16px;
  color: #999;
  padding: 4px;
  cursor: pointer;
}

.tags-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tag {
  padding: 6px 14px;
  background-color: #f7f8fa;
  border-radius: 4px;
  font-size: 13px;
  color: #646566;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.hot-tag.top-three {
  color: #ff6b00;
  background-color: #fff5ed;
  font-weight: 500;
}

.rank-icon {
  margin-right: 4px;
  color: #ff5000;
  font-size: 14px;
}
</style>