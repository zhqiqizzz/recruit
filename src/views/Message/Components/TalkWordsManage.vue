<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { chatMessageWordsListApi, chatMessageWordsDeleteApi } from '@/api/message';
import TalkWordsAdd from '@/views/Message/Components/TalkWordsAdd.vue';
import { Toast } from 'vant';
const wordList = ref<Array<any>>([])
const addBool = ref<boolean>(false)
const title = ref<string>('')
const editId = ref<any>(null)
const input = ref<any>(null)
const loading = ref<boolean>(false)
const emit = defineEmits(['close-works-manage'])
const getChatMessageWordsList = async () => {
    loading.value = true
    const res = await chatMessageWordsListApi()
    wordList.value = res.data
    loading.value = false
}
const closeWorksManage = () => {
    emit('close-works-manage')
}
const editChange = (id: number, text: string) => {
    editId.value = id
    input.value = text
    title.value = '编辑常用语'
    addBool.value = true
}
const submitDelete = async (id: number) => {
    const res = await chatMessageWordsDeleteApi({ 
        id: id
    })
    if(res.errCode === 200){
        Toast.success('删除成功')
        getChatMessageWordsList()
    } else {
        Toast.fail('删除失败')
    }
}
const closeWorksAdd = () => {
    addBool.value = false
    input.value = ''
    getChatMessageWordsList()
}
const addChange = () => {
    editId.value = ''
    input.value = ''
    title.value = '添加常用语'
    addBool.value = true
}
onMounted(() => {
    getChatMessageWordsList()
})
</script>
<template>
    <van-nav-bar title="管理常用语" left-arrow fixed placeholder @click-left="closeWorksManage" />
    <div class="manage-list">
        <van-swipe-cell  v-for="(item,index) in wordList" :key="index">
            <div class="item">
                <p>{{item.text}}</p>
                <div>
                    <img src="@/assets/img/icon/icon-edit.png" />
                    <span @click="editChange(item.id,item.text)">编辑</span>
                </div>
            </div>
            <!-- 左滑浮现删除按钮 -->
            <template #right>
                <img @click="submitDelete(item.id)" src="@/assets/img/icon/icon-delete.png" class="delete" />
            </template>
        </van-swipe-cell>
    </div>
    <div class="foot-mask"></div>
    <button @click="addChange" class="add">添加常用语</button>
    <!-- 全都是用添加弹窗，然后改变标题就行
     如果是编辑的话，传入id和text，添加的话就不传 -->
    <van-popup v-model:show="addBool" position="top" duration="0" :style="{ width: '100%',height: '100%' }">
        <TalkWordsAdd @close-works-add="closeWorksAdd" :title="title" :id="editId" :text="input"></TalkWordsAdd>
    </van-popup>
</template>
<style scoped>
::v-deep(.van-swipe-cell__right) {
    display: flex;
    align-items: center;
}
.item{
    margin: 0 0.72rem;
    border-bottom: 1px solid #eeeeee;
}
.item p{
    font-size: 0.75rem;
    font-weight: 300;
    color: #030303;
    line-height: 1.12rem;
    padding: 1rem 0.2rem 0.4rem;
    text-align: left;
}
.item div{
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 0.77rem;
}
.item div span{
    font-size: 0.75rem;
    line-height: 0.75rem;
    font-weight: 300;
    color: #030303;
    text-align: right;
}
.item div img{
    width: 0.91rem;
    height: 0.91rem;
}
.delete{
    width: 1.87rem;
    height: 1.87rem;
    margin-right: 0.64rem;
}
.manage-list { 
    position: fixed; 
    top: var(--van-nav-bar-height); 
    left: 0; 
    right: 0; 
    bottom: 3.8rem; 
    overflow-y: auto; 
    -webkit-overflow-scrolling: touch; 
}
.foot-mask{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 3.8rem;
    background: #FFFFFF;
    z-index: 10;
    pointer-events: none;
}
.add{
    height: 2.35rem;
    background: linear-gradient(90deg, #FFA400, #FF8900);
    border-radius: 0.27rem;
    line-height: 2.35em;
    position: fixed;
    border: none;
    bottom: 0.64rem;
    margin: 0 0.64rem;
    font-size: 0.8rem;
    font-weight: 400;
    color: #FFFFFF;
    width: calc(100vw - 1.28rem);
    left: 0;
    z-index: 20;
}
</style>