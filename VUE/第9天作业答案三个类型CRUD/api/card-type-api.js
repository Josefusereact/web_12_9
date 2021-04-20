import api from '../http';

//类型分页
export const getCardTypeList = (data)=>{
    return api.http({
        method:'get',
        url:'/card-type/list/page',
        params:{
			pno:data.pno,
			psize:data.psize,
			name:data.name,//类型名称
            bm: data.bm,//类型编码
            remark: data.remark//类型备注
		},
    });
}
//类型添加
export const addCardType = (data) => {
    return api.http({
        method:'put',
        url:'/card-type/insert',
        data:{
            "name": data.name,
            "bm":data.bm,
            "remark": data.remark
        }
    });
}
//类型更新

export const updateCardType = (data) => {
    return api.http({
        method:'put',
        url:'/card-type/update',
        data:{
            id: data.id,
            "name": data.name,
            "bm":data.bm,
            "remark": data.remark
        }
    });
}
//优惠券类型通过id查找，也叫加载load

export const getCardTypeById = (id) =>{
    return api.http({
        method: 'GET',
        url:"/card-type/find/id/"+id
    });
}
//类型删除
export const deleteCardTypeById = (id) =>{
    return api.http({
        method: 'delete',
        url:`/card-type/delete/id/${id}`
    })
}