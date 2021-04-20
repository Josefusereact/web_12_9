import api from '../http'
export const getGoodsList = (data) => {
	return api.http({
		url:'/goods/list/page',
		params:{
			pno:data.pno,
			psize:data.psize,
			name:data.name,
            isOnSale:data.isOnSale,
            goodsTypeId: data.goodsTypeId
		},
		method:'get'
	})
}
export const addGoods = (data)=>{
    return api.http({
		url:`/goods/insert`,
		method:'put',
		data
	})
}
export const delGoods = (id)=>{
    return api.http({
        url:`/goods/delete/id/${id}`,
        method:'delete',
    })
}
export const loadGoods = (id)=>{
    return api.http({
        url:`/goods/find/id/${id}`,
		method:'get',
    });
}
export const updateGoods = (data)=>{
    return api.http({
		url:`/goods/update`,
		method:'put',
		data
	})
}
export const setOnSale = (id,isOnSale)=>{
    return api.http({
        url:`/goods/set/onsale`,
        method:'get',
        params:{
            id,
            isOnSale
        }
    })
}