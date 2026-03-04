import request from "@/utils/request";

export function getContractListApi(data: any) {
    return request({
        url: '/task/myContractAllList',
        method: 'get',
        params: data
    }) as Promise<any>;
}

export function getContractDetailApi(data: any) {
    return request({
        url: '/task/contractAllList',
        method: 'get',
        params: data
    }) as Promise<any>;
}

// 新增合约
export function addContractApi(data: any) {
    return request({
        url: '/task/addcontract',
        method: 'put',
        data
    }) as Promise<any>;
}

// 合约 签约/拒绝 接口
export function isContractApi(data: any) {
    return request({
        url: '/contract/isContract',
        method: 'put',
        data
    }) as Promise<any>;
}

// 合约进度评估
export function contractGradeApi(data: any) {
    return request({
        url: '/contract/grade/edit',
        method: 'put',
        data
    }) as Promise<any>;
}