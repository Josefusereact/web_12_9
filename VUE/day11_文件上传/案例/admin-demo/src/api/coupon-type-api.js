import api from '../http';

//优惠券类型分页
export const getCouponTypeList = (data)=>{
    return api.http({
        method:'get',
        url:'/coupon-type/list/page',
        params:{
			pno:data.pno,
			psize:data.psize,
			name:data.name,//类型名称
            remark: data.remark//类型备注
		},
    });
}
//优惠券类型添加
export const addCouponType = (data) => {
    return api.http({
        method:'put',
        url:'/coupon-type/insert',
        data:{
            "name": data.name,
            "remark": data.remark
        }
    });
}
//优惠券类型更新

export const updateCouponType = (data) => {
    return api.http({
        method:'put',
        url:'/coupon-type/update',
        data:{
            id: data.id,
            "name": data.name,
            "remark": data.remark
        }
    });
}
//优惠券类型通过id查找，也叫加载load

export const getCouponTypeById = (id) =>{
    return api.http({
        method: 'GET',
        url:"/coupon-type/find/id/"+id
    });
}
//优惠券类型删除
export const deleteCouponTypeById = (id) =>{
    return api.http({
        method: 'delete',
        url:`/coupon-type/delete/id/${id}`
    })
}