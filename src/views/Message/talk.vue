<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, provide, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { chatMessageContentApi, chatMessageContentAddApi } from '@/api/message';
import TalkWords from '@/views/Message/Components/TalkWords.vue';
import TalkEmoji from '@/views/Message/Components/TalkEmoji.vue';
import { Toast } from 'vant';
const route = useRoute();
const router = useRouter();
const receiveId = route.params.userId
const thingsId = route.params.taskId
const input = ref<String>('')
const taskName = ref<any>('')
const list = ref<Array<any>>([])
const talkPageRef = ref<HTMLElement | null>(null)
const loading = ref<Boolean>(false)
const worksVisible = ref<Boolean>(false)
const emojiVisible = ref<Boolean>(false)
const createSetInterval = ref<any>(null)
const leftBack = () => {
    router.back();
}

const getChatContent = async () => {
    loading.value = true
    const res = await chatMessageContentApi({
        receive_id: receiveId,
        things_id: thingsId,
        things_type: 0
    })
    list.value = res.data
    taskName.value = res.data[0].task_name || '任务'
    loading.value = false
    await nextTick()
    if (talkPageRef.value) {
      talkPageRef.value.scrollTop = talkPageRef.value.scrollHeight
    }
}

// 每隔指定时间（毫秒）重复执行一次代码
// 轮询新消息
const createInterval = () => {
    stopInterval()
    createSetInterval.value = setInterval(() => {
        getChatContent()
    }, 5000)
}
const stopInterval = () => {
    if(createSetInterval.value) {
        clearInterval(createSetInterval.value)
        createSetInterval.value = null
    }
}

// 常用语/Emoji点击事件
const worksChange = (text: string) => {
    input.value = text
    worksVisible.value = false
}
const emojiChange = (emoji: string) => {
    worksVisible.value = false
    input.value += emoji
}

// 将常用语和Emoji点击事件提供给子组件使用
provide('worksChange', worksChange)
provide('emojiChange', emojiChange)

const worksClick = () => {
    emojiVisible.value = false
    worksVisible.value = !worksVisible.value
}
const emojiClick = () => {
    worksVisible.value = false
    emojiVisible.value = !emojiVisible.value
}

const sendSubmit = async () => {
  const res = await chatMessageContentAddApi({
    receive_id: receiveId,
    things_id: thingsId,
    things_type: 0,
    content: input.value
  })
  if(res.errCode === 200){
    input.value = ''
    getChatContent()
  } else {
    Toast.fail('消息发送失败，请重试')
  }
  worksVisible.value = false
  emojiVisible.value = false
}

onMounted(() => {
    getChatContent()
    createInterval()
})
onBeforeUnmount(() => {
    stopInterval()
})
</script>
<template>
  <van-nav-bar :title="taskName" left-arrow @click-left="leftBack"/>
  <div ref="talkPageRef" class="talk-page">
    <dl>
        <!-- 这里是在写靠右的（发送端）的逻辑 -->
        <dt v-for="(item,index) in list" :key="index" :class="{ active: item.receive_id === receiveId}">
            <h5>{{item.create_time}}</h5>
            <div>
                <img v-if="item.receive_id === receiveId" :src="item.senderPhoto" />
                <img v-else :src="item.receivePhoto" />
                <p>{{item.text}}</p>
            </div>
        </dt>
    </dl>
  </div>
  <div class="talk-bottom">
    <div class="talk-input">
        <span @click="worksClick">常用语</span>
        <input v-model="input" type="text" />
        <van-icon name="smile-o" @click="emojiClick" />
        <span @click="sendSubmit">发送</span>
    </div>
    <TalkWords v-if="worksVisible"></TalkWords>
    <TalkEmoji v-if="emojiVisible"></TalkEmoji>
  </div>
</template>
<style scoped>
  .talk-page{
    width: 100%;
    background: #f3f3f3;
    height: calc(100vh - 46px - 2.6rem);
    overflow: auto;
  }
  dl{
    padding: 0.96rem 0.64rem;
  }
  dl dt{
    overflow: hidden;
  }
  dl dt h5{
    font-size: 0.64rem;
    line-height: 0.64rem;
    font-weight: 300;
    color: #999999;
    text-align: center;
    margin-bottom: 0.69rem;
  }
  dl dt div{
    display: flex;
  }
  dl dt img{
    width: 2.14rem;
    height: 2.14rem;
    border-radius: 50%;
    margin-right: 0.64rem;
  }
  dl dt p{
    width: 12.53rem;
    background: #FFFFFF;
    border: 1px solid #EFEFEF;
    border-radius: 0.11rem;
    padding: 0.4rem 0.69rem;
    margin-bottom: 1.47rem;
  }
  dl dt.active div{
    display: block;
  }
  dl dt.active img{
    float: right;
    margin-right:0;
    margin-left:0.64rem;
  }
  dl dt.active p{
    float: right;
    font-size: 0.75rem;
    font-weight: 300;
    color: #FFFFFF;
    border: 1px solid #FF9415;
    background: #FF9415;
    border-radius: 0.13rem;
    position: relative;
  }
  .talk-bottom{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    background: #ffffff;
    text-align: center;
    z-index: 1;
    border-top: 1px solid #eeeeee;
  }
  .talk-input{
    display: flex;
    align-items: center;
    height: 2.6rem;
  }
  .talk-input span{
    width: 2.61rem;
    height: 1.33rem;
    line-height: 1.33rem;
    background: #FF9415;
    border-radius: 0.13rem;
    font-size: 0.64rem;
    font-weight: 100;
    text-align: center;
    color: #FFFFFF;
    margin-left: 0.59rem;
  }
  .talk-input span:last-child{
    margin: 0 0.59rem 0 0;
  }
  .talk-input input{
    flex: 1;
    height: 1.8rem;
    background: #FBFBFB;
    border: 1px solid #EFEFEF;
    border-radius: 0.13rem;
    padding: 0 0.5rem;
    margin: 0 0.4rem 0 0.5rem;
  }
  .talk-input i{
    font-size: 1.36rem;
    margin-right: 0.4rem;
  }
</style>