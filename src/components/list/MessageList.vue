<script setup lang="ts">
    import {useRouter} from 'vue-router'
    import type { Message } from '@/types/message';
    const props = withDefaults(defineProps<{
        messageList: Message[]
    }>(),{
        messageList: () => []
    })
    const router = useRouter()
    const gotoDetail = (id: number) =>{
        router.push(`/message/details/${id}`)
    }
</script>
<template>
    <dl v-for="(item,index) in messageList" :key="index" @click="gotoDetail(item.id)">
        <dd>
            <!-- <img v-if="item.receive_is_read" :src="item.receive_is_read">
            <img v-else src="@/assets/img/icon/icon-message.png">
            <span v-if="item.is_show"></span> -->
            <img src="@/assets/img/icon/icon-message.png"></img>
            <span></span>
        </dd>
        <dt>
            <!-- <h3>{{item.things_type ===1?item.receive_id_name:item.title}}<span>{{item.create_time}}</span></h3>
            <p>{{item.content}}</p> -->
            <h3>系统消息<span>2024-06-01</span></h3>
            <p>您的账户密码已成功修改，如非本人操作，请及时联系客服。</p>
        </dt>
    </dl>
</template>
<style scoped>
dl{
    font-size: 0.64rem;
    color: #666666;
    padding: 0.9rem 0;
    margin: 0 0.67rem;
    border-bottom: 1px solid #eeeeee;
    display: flex;
    align-items: center;
}
dl dd{
    position: relative;
    margin-right: 0.56rem;
}
dl dd img{
    width: 2.61rem;
    height: 2.61rem;
    border-radius: 50%;
}
dl dd span{
    position: absolute;
    top: 0;
    right:0;
    width: 0.32rem;
    height: 0.32rem;
    background: #FF0000;
    border-radius: 50%;
}
dl dt{
    flex: 1;
}
dl dt h3{
    font-size: 0.8rem;
    line-height: 0.8rem;
    font-weight: 500;
    color: #333333;
    margin-bottom: 0.43rem;
}
dl dt h3 span{
    float: right;
    color: #999999;
    font-size: 0.64rem;
    font-weight: 100;
}
dl dt p{
    font-size: 0.69rem;
    line-height: 0.69rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
}
</style>