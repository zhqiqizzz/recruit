<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { useTsStore } from '@/store/my';
import { useMyStore } from '@/store/my';
import { common } from '@/utils/common';
import { uploadImageApi, userModifyApi } from '@/api/my';
import { Toast } from 'vant';
import router from '@/router';
const tsStore = useTsStore()
const myStore = useMyStore()
const state = reactive({
    fileList: [] as Array<{ url: string }>,
    showSex: false,
    showBirthday: false,
    showWorkTime: false,
    showCity: false,
    loading: false,
    userName: '',
    sex: '',
    birthday: '',
    workTime: '',
    city: '',
    area: '',
    birthdayDate: new Date(),
    workTimeDate: new Date(),
    location: '',
    curLocation: [] as (string | number)[],
    minDate: new Date(1970, 0, 1),
    // new Date() 就是当前时间
    maxDate: new Date()
})
const sexList = [
    { name: '男', value: 1 },
    { name: '女', value: 2 }
]
const city = (city: string, area: string) => {
    const cityObj = tsStore.areaList.find((item: any) => item.text === city)
    if(!cityObj) return []
    const areaId = cityObj.children.find((child: any) => child.text === area)?.value
    return [cityObj.value, areaId]
}
const setInfo = () => {
    state.userName = myStore.userInfo.user_name;
    state.sex = common.sex(myStore.userInfo.sex)
    state.birthday = myStore.userInfo.birthday
    state.workTime = myStore.userInfo.work_time
    state.city = myStore.userInfo.city
    state.area = myStore.userInfo.area
    if(myStore.userInfo.it_head){
        state.fileList = [{
            url: myStore.userInfo.it_head
        }]
    }
    if(myStore.userInfo.birthday) {
        state.birthdayDate = common.strToDate(myStore.userInfo.birthday)
    }
    if(myStore.userInfo.work_time) {
        state.workTimeDate = common.strToDate(myStore.userInfo.work_time)
    }
    if(myStore.userInfo.city && myStore.userInfo.area) {
        state.location = myStore.userInfo.city + '-' + myStore.userInfo.area
        state.curLocation = city(myStore.userInfo.city, myStore.userInfo.area)
    } else {
        state.location = myStore.userInfo.city || myStore.userInfo.area || ''
        state.curLocation = []
    }
}
const afterRead = async (file: any) => {
    file.status = 'uploading';
    file.message = '上传中...';
    const formData = new FormData();
    formData.append('file', file.file);
    formData.append('user', 'test');
    const res = await uploadImageApi(formData);
    file.url = res.data.imageUrl;
    file.status = 'done';
    file.message = '上传成功';
    state.fileList = [file]
}
const deleteFile = () => {
    state.fileList = []
}
// .padStart(2, '0') 如果字符串长度不足 2 位，在开头补 '0'
// const year = date.getFullYear()
// const month = (date.getMonth() + 1).toString().padStart(2, '0')
// const day = date.getDate().toString().padStart(2, '0')
// return `${year}-${month}-${day}`
const birthdayConfirm = (value: Date) => {
    state.birthday = common.dateToStr(value)
    state.showBirthday = false
}
const workTimeConfirm = (value: Date) => {
    state.workTime = common.dateToStr(value)
    state.showWorkTime = false
}
const cityConfirm = (value: any) => {
    state.city = value[0].text
    state.area = value[1].text
    state.location = state.city + '-' + state.area
    state.curLocation = city(state.city, state.area)
    state.showCity = false
}
const sexSelect = (item: any) => {
    state.sex = item.name
    state.showSex = false
}
const closeChange = () => {
    router.back();
}
const setUserModify = async () => {
    if(state.fileList.length===0){
        Toast('请上传头像')
        return
    }
    if(!state.userName){
        Toast('请填写姓名')
        return
    }
    if(!state.sex){
        Toast('请选择性别')
        return
    }
    if(!state.birthday){
        Toast('请选择出生年月')
        return
    }
    if(!state.workTime){
        Toast('请选择参加工作时间')
        return
    }
    if(!state.city){
        Toast('请选择城市')
        return
    }
    state.loading = true
    const res = await userModifyApi({
        user_name: state.userName,
        sex: state.sex === '男' ? 1 : 2,
        birthday: state.birthday,
        work_time: state.workTime,
        city: state.city,
        area: state.area,
        it_head: state.fileList[0]?.url,
        type: myStore.userInfo.role
    })
    if(res.errCode === 200){
        Toast.success('修改成功')
        myStore.getUserInfo()
        router.back();
    } else {
        Toast.fail('修改失败')
    }
    state.loading = false
}
onMounted( async () => {
    await tsStore.getCityList()
    await myStore.getUserInfo()
    setInfo()
})
</script>
<template>
    <van-nav-bar title="个人信息" left-arrow @click-left="closeChange"/>
    <div class="user-page">
        <van-form @submit="setUserModify">
            <div class="user-pic">
                <!-- 上传头像 -->
                <van-uploader v-model="state.fileList" accept=".jpg,.png" 
                    :after-read="afterRead" 
                    :before-delete ="deleteFile"
                    max-count="1" />
            </div>
            <div class="user-item">
                <h5>姓名</h5>
                <van-field v-model="state.userName" label="" placeholder="请输入您的姓名" />
            </div>
            <div class="user-item">
                <h5>性别</h5>
                <van-field v-model="state.sex" label="" placeholder="请选择您的性别" 
                    readonly
                    is-link
                    @click="state.showSex = true"/>
                <van-action-sheet
                    v-model:show="state.showSex"
                    :actions="sexList"
                    cancel-text="取消"
                    close-on-click-action
                    @select="sexSelect"
                    />
            </div>
            <div class="user-item">
                <h5>出生日期</h5>
                <van-field v-model="state.birthday" label="" placeholder="请选择您的出生日期"
                    readonly
                    is-link
                    @click="state.showBirthday = true"/>
                <van-action-sheet v-model:show="state.showBirthday">
                    <van-datetime-picker
                    v-model="state.birthdayDate"
                    type="date"
                    title="选择日期"
                    :min-date="state.minDate"
                    :max-date="state.maxDate"
                    @confirm="birthdayConfirm"
                    @cancel="state.showBirthday = false"
                    />
                </van-action-sheet>
            </div>
            <div class="user-item">
                <h5>参加工作时间</h5>
                <van-field v-model="state.workTime" label="" placeholder="请选择您的工作时间"
                    readonly
                    is-link
                    @click="state.showWorkTime = true"/>
                <van-action-sheet v-model:show="state.showWorkTime">
                    <van-datetime-picker
                    v-model="state.workTimeDate"
                    type="date"
                    title="选择日期"
                    :min-date="state.minDate"
                    :max-date="state.maxDate"
                    @confirm="workTimeConfirm"
                    @cancel="state.showWorkTime = false"
                    />
                </van-action-sheet>
            </div>
            <div class="user-item">
                <h5>所在城市</h5>
                <van-field v-model="state.location" label="" placeholder="请选择您的城市"
                    readonly
                    is-link
                    @click="state.showCity = true"/>
                <van-action-sheet v-model:show="state.showCity">
                    <van-picker
                        v-model="state.curLocation"
                        :columns="tsStore.areaList"
                        @confirm="cityConfirm"
                        @cancel="state.showCity = false"
                    />
                </van-action-sheet>
            </div>
            <button class="wy-confirm-btn" native-type="submit">完成</button>
        </van-form>
    </div>
</template>
<style scoped>
::v-deep(.van-image__img){
    border-radius: 50%;
}
::v-deep(.van-uploader__upload){
    margin: 0;
}

.user-page{
    margin: 0 0.6rem;
}
.user-pic{
    text-align: center;
    padding: 0.67rem;
    margin-bottom: 1.47rem;
    border-bottom: 1px solid #f3f3f3;
}
.user-pic img{
    width: 3.7rem;
    height: 3.7rem;
    border-radius: 50%;
}

.wy-confirm-btn{
    height: 2.35rem;
    line-height: 2.35rem;
    background: linear-gradient(90deg, #FEA829, #FE8F27);
    border-radius: 0.27rem;
    width: calc(100vw - 1.2rem);
    border: 0;
    position: fixed;
    left: 0;
    bottom: 0;
    margin: 0 0.6rem 0.6rem;
    font-size: 0.8rem;
    color: #FFFFFF;
}
</style>