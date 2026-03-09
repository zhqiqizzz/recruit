import request from '@/utils/request'
// 获取用户基本信息接口
export function userInfoApi() {
    return request({
        url: '/clicent/user_info',
        method: 'get'
    })
}
// 头像上传接口
export function uploadImageApi(data: any) {
    return request({
        url: '/upload/image',
        method: 'post',
        data
    }) as Promise<any>
}
// 个人信息提交接口
export function userModifyApi(data: any) {
    return request({
        url: '/user/modify',
        method: 'put',
        data
    }) as Promise<any>
}
// 获取我的收藏接口
export function collectListApi() {
    return request({
        url: '/task/getTaskCollection',
        method: 'get'
    }) as Promise<any>
}
// 获取企业端我的收藏接口
export function talentCollectListApi() {
    return request({
        url: '/collect/resume/list',
        method: 'get',
        params: {
            type: 1
        }
    })
}
// 获取我的提现接口
export function transferListApi() {
    return request({
        url: '/my/transfer/userList',
        method: 'get'
    })
}
// 获取我的收入接口
export function incomeListApi(data: any) {
    return request({
        url: '/admin/task/purchaseRecord',
        method: 'get',
        params: data
    })
}
// 我的提现接口
export function withdrawalApi(data: any) {
    return request({
        url: '/my/apply/transfer',
        method: 'post',
        data
    }) as Promise<any>
}
// 获取我的简历详情接口
export function resumeDetailApi(data: any) {
    return request({
        url: '/admin/resume/getInfoDetailsAPI',
        method: 'get',
        params: {
            id: data.resume_id
        }
    })
}
// 我的简历个人优势保存接口
export function personAdvantageApi(data: any) {
    return request({
        url: '/resume/advantage',
        method: 'post',
        data
    })
}
// 获取我的简历类型字典接口
export function resumeDictApi() {
    return request({
        url: '/conllect/recuit/getRecuit',
        method: 'get'
    })
}
// 我的简历求职意愿保存接口
export function jobIntentionApi(data: any) {
    return request({
        url: '/resume/job_intention',
        method: 'post',
        data
    })
}
// 获取我的简历技能字典接口
export function labelsSkillApi() {
    return request({
        url: '/resume/labels_skill',
        method: 'get',
        params: {
            pid: 4
        }
    })
}
// 我的简历擅长技能保存接口
export function resumeSkillApi(data: any) {
    return request({
        url: '/resume/skill',
        method: 'post',
        data
    })
}
// 我的简历工作经历删除接口
export function workDeleteApi(data: any) {
    return request({
        url: '/job/resume/work/delete',
        method: 'delete',
        params: data
    })
}
// 我的简历工作经历添加接口
export function addWorkExperApi(data: any) {
    return request({
        url: '/admin/resume/work/add',
        method: 'post',
        data
    })
}
// 我的简历工作经历修改接口
export function editWorkExperApi(data: any) {
    return request({
        url: '/resume/work/edit',
        method: 'put',
        data
    })
}
// 我的简历工作经历删除接口
export function projectDeleteApi(data: any) {
    return request({
        url: '/admin/resume/project/delete',
        method: 'delete',
        data,
        params: data
    })
}
// 我的简历项目经历添加接口
export function addProjectExperApi(data: any) {
    return request({
        url: '/admin/resume/project/add',
        method: 'post',
        data
    })
}
// 我的简历项目经历修改接口
export function editProjectExperApi(data: any) {
    return request({
        url: '/admin/resume/project/edit',
        method: 'put',
        data
    })
}
// 我的简历教育经历保存接口
export function editEduApi(data: any) {
    return request({
        url: '/resume/edu/edit',
        method: 'put',
        data
    })
}
// 实名认证保存接口
export function addAuthRealApi(data: any) {
    return request({
        url: '/real/auth/user',
        method: 'post',
        data
    })
}
// 意见反馈保存接口
export function addFeedbackApi(data: any) {
    return request({
        url: '/feedback/add',
        method: 'post',
        data
    })
}