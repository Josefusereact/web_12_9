import api from '../http';

//会员类型分页
export const getUserTypeList = (data)=>{
    return api.http({
        method:'get',
        url:'/user-type/list/page',
        params:{
			pno:data.pno,
			psize:data.psize,
			name:data.name,//类型名称
            remark: data.remark//类型备注
		},
    });
}
//会员类型添加
export const addUserType = (data) => {
    return api.http({
        method:'put',
        url:'/user-type/insert',
        data:{
            "name": data.name,
            "remark": data.remark
        }
    });
}
//会员类型更新

export const updateUserType = (data) => {
    return api.http({
        method:'put',
        url:'/user-type/update',
        data:{
            id: data.id,
            "name": data.name,
            "remark": data.remark
        }
    });
}
//会员类型通过id查找，也叫加载load

export const getUserTypeById = (id) =>{
    return api.http({
        method: 'GET',
        url:"/user-type/find/id/"+id
    });
}
//会员类型删除
export const deleteUserTypeById = (id) =>{
    return api.http({
        method: 'delete',
        url:`/user-type/delete/id/${id}`
    })
}