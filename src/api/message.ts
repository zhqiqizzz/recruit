import request from "@/utils/request";
// 通知消息列表
export function systemListApi(data: any) {
    return request({
        url: '/user/inform/list',
        method: 'get',
        params: data
    })
}
// 通知消息详情
export function systemDetailsApi(data: any) {
    return request({
        url: '/user/inform/lookover',
        method: 'get',
        params: data
    })
}
// 对话列表
export function chatMessageListApi() {
    return request({
        url: '/it_chat/my/message/list',
        method: 'get'
    })
}
// 对话消息聊天内容
export function chatMessageContentApi(data: any) {
    return request({
        url: '/it_chat/message/list',
        method: 'get',
        params: data
    })
}
// 对话消息内容发送
export function chatMessageContentAddApi(data: any) {
    return request({
        url: '/it_chat/add_message',
        method: 'post',
        data
    }) as Promise<any>
}
// 消息常用语列表
export function chatMessageWordsListApi() {
    return request({
        url: '/it_chat/message/works/list',
        method: 'get',
    })
}
// 消息常用语添加
export function chatMessageWordsAddApi(data: any) {
    return request({
        url: '/it_chat/message/works/add',
        method: 'post',
        data
    }) as Promise<any>
}
// 消息常用语修改
export function chatMessageWordsEditApi(data: any) {
    return request({
        url: '/it_chat/message/works/edit',
        method: 'post',
        data
    }) as Promise<any>
}
// 消息常用语删除
export function chatMessageWordsDeleteApi(data: any) {
    return request({
        url: '/it_chat/message/works/delete',
        method: 'post',
        data
    }) as Promise<any>
}

