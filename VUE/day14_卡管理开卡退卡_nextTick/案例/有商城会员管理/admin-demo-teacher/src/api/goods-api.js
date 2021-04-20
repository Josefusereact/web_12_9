import api from '../http'

export const getGoodsListForPage = (queryForm) => {
	return api.http({
		url:'/goods/list/page',
		method:'get',
		params:queryForm
	})
}

export const insertGoods = (addForm) => {
	return api.http({
		url:'/goods/insert',
		method:'put',
		data:addForm
	})
}

export const findGoodsById = (id) => {
	return api.http({
		url:`/goods/find/id/${id}`,
		method:'get',
		data:id
	})
}

export const updateGoods = (addForm) => {
	return api.http({
		url:`/goods/update`,
		method:'put',
		data:addForm
	})
}

export const deleteGoodsById = (id) => {
	return api.http({
		url:`/goods/delete/id/${id}`,
		method:'delete',
	})
}

export const setGoodsIsOnSale = (params) => {
	return api.http({
		url:`/goods/set/onsale`,
		method:'get',
		params:params
	})
}