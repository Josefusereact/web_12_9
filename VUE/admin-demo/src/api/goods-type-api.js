import api from '../http';

//商品类型分页
export const getGoodsTypeList = (data)=>{
    return api.http({
        method:'get',
        url:'/goods-type/list/page',
        params:{
			pno:data.pno,
			psize:data.psize,
			name:data.name,//类型名称
            remark: data.remark//类型备注
		},
    });
}
//商品类型添加
export const addGoodsType = (data) => {
    return api.http({
        method:'put',
        url:'/goods-type/insert',
        data:{
            "name": data.name,
            "remark": data.remark
        }
    });
}
//商品类型更新

export const updateGoodsType = (data) => {
    return api.http({
        method:'put',
        url:'/goods-type/update',
        data:{
            id: data.id,
            "name": data.name,
            "remark": data.remark
        }
    });
}
//商品类型通过id查找，也叫加载load

export const getGoodsTypeById = (id) =>{
    return api.http({
        method: 'GET',
        url:"/goods-type/find/id/"+id
    });
}
//商品类型删除
export const deleteGoodsTypeById = (id) =>{
    return api.http({
        method: 'delete',
        url:`/goods-type/delete/id/${id}`
    })
}