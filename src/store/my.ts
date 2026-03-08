import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userInfoApi } from '@/api/my'
import { getCityListApi } from '@/api/task'
export const useMyStore = defineStore('my', () => {
    const userInfo = ref<any>({})
    const getUserInfo = async () => {
        const res = await userInfoApi()
        userInfo.value = res
    }
    return {
        userInfo,
        getUserInfo
    }
})

export const useTsStore = defineStore('ts', () => {
    const areaList = ref<any[]>([])
    const getCityList = async () => {
        const res = await getCityListApi()
        areaList.value = res.map((city: any) => ({
            text: city.name,
            value: city.id,
            children: city.children?.map((area: any) => ({
                text: area.name,
                value: area.id
            })) || []
        }))
    }
    return {
        areaList,
        getCityList
    }
})