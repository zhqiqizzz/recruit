<script setup lang="ts">
import { onMounted, ref, inject } from 'vue';
import TalkWordsAdd from '@/views/Message/Components/TalkWordsAdd.vue';
import TalkWordsManage from '@/views/Message/Components/TalkWordsManage.vue';
import { chatMessageWordsListApi } from '@/api/message';
const wordList = ref<any[]>([])
const addBool = ref<boolean>(false)
const manageBool = ref<boolean>(false)
const loading = ref<boolean>(false)
// 后代组件接受父组件提供的方法
const worksChange = inject<(text: string) => void>('worksChange')
const getChatMessageWordsList = async () => {
    loading.value = true
    const res = await chatMessageWordsListApi()
    wordList.value = res.data
    loading.value = false
}
// 关闭常用语弹窗
const closeWorksAdd = () => {
    addBool.value = false
    getChatMessageWordsList()
}
const closeWorksManage = () => {
    manageBool.value = false
    getChatMessageWordsList()
}
onMounted(() => {
    getChatMessageWordsList()
})
</script>
<template>
    <div class="talk-word">
        <dl>
            <dt v-for="(item,index) in wordList" :key="index" @click="worksChange?.(item.text)">{{item.text}}</dt>
        </dl>
        <div class="talk-word-btn">
            <p @click="addBool = true"><img src="@/assets/img/icon/icon-add.png" />添加</p>
            <i></i>
            <p @click="manageBool = true"><img src="@/assets/img/icon/icon-file.png" />管理</p>
        </div>
      <!--常用语添加弹窗-->
      <van-popup v-model:show="addBool" position="top" duration="0" :style="{ width: '100%',height: '100%' }">
        <TalkWordsAdd @close-works-add="closeWorksAdd" title="添加常用语"></TalkWordsAdd>
      </van-popup>
      <!--常用语管理-->
      <van-popup v-model:show="manageBool" position="top" duration="0" :style="{ width: '100%',height: '100%' }">
        <TalkWordsManage @close-works-manage="closeWorksManage"></TalkWordsManage>
      </van-popup>
    </div>
</template>
<style scoped>
  dl{
    height: 8.7rem;
    margin: 0 0.85rem;
    border-top: 1px solid #eeeeee;
    border-bottom: 1px solid #eeeeee;
    overflow: auto;
  }
  dl dt{
    font-size: 0.75rem;
    font-weight: 300;
    color: #030303;
    line-height: 1.12rem;
    padding: 1rem 0.21rem;
    border-bottom: 1px solid #eeeeee;
    text-align: left;
  }
  dl dt:last-child{
    border-bottom: 0;
  }
  .talk-word{
    height: 12rem;
  }
  .talk-word-btn{
    display: flex;
    margin-top: 1rem;
  }
  .talk-word-btn p{
    display: flex;
    align-items: center;
    flex: 1;
    justify-content: center;
    font-size: 0.75rem;
    font-weight: 300;
    color: #030303;
  }
  .talk-word-btn p img{
    width: 0.91rem;
    height: 0.91rem;
    margin-right: 0.29rem;
  }
  .talk-word-btn i{
    width: 0.03rem;
    height: 0.85rem;
    background: #EFEFEF;
    display: inline-block;
  }
</style>