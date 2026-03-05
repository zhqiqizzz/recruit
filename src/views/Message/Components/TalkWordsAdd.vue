<script setup lang="ts">
import { ref,watch } from 'vue';
import { Toast } from 'vant';
import { chatMessageWordsAddApi, chatMessageWordsEditApi } from '@/api/message';
const emit = defineEmits(['close-works-add'])
const props = withDefaults(defineProps<{
    title: string
    id?: string
    text?: string
}>(), {
    title: "添加常用语" // 父组件没有传参，使用默认标题
})

const input = ref<string>('') // 编辑时使用传入的文本，添加时默认为空;
watch(() => props.text, 
    (newVal) => {
        input.value = newVal || ''
    }, 
    { immediate: true }
)
const closeWorksAdd = () => {
    emit('close-works-add')
}
const submitAdd = async () => {
    if(!input.value.trim()) {
        Toast.fail('请输入常用语内容');
        return;
    }
    let res
    if(props.id){
        console.log('编辑', props.id, input.value)
        res = await chatMessageWordsEditApi({
            id: props.id,
            text: input.value
        })
    } else {
        res = await chatMessageWordsAddApi({
            text: input.value
        })
    }
    if(res.errCode === 200){
        Toast.success('添加成功')
        // 关闭弹窗
        input.value = ''
        closeWorksAdd()
    } else {
        Toast.fail('添加失败')
    }
}
</script>
<template>
    <van-nav-bar :title="props.title" left-arrow @click-left="closeWorksAdd">
        <template #right>
            <span @click="submitAdd">完成</span>
        </template>
    </van-nav-bar>
    <van-field
        v-model="input"
        rows="10"
        autosize
        label=""
        type="textarea"
        maxlength="200"
        placeholder="请输入您的常用回复请不要填写qq、微信等联系方式或 广告信息，否则系统将封禁您的账号。"
        show-word-limit
    />
</template>
<style scoped>
::v-deep(.van-field__word-num) {
    color: #FF9415;
}
::v-deep(.van-field__word-limit) {
    color: #999999;
}
</style>