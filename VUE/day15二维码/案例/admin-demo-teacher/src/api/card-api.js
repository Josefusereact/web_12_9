import api from '../http'

export const getCardListForPage = (queryForm) => {
	return api.http({
		url:'/card/list/page',
		method:'get',
		params:queryForm
	})
}

export const insertCard = (addForm) => {
	return api.http({
		url:'/card/insert',
		method:'put',
		data:addForm
	})
}

export const findCardById = (id) => {
	return api.http({
		url:`/card/find/id/${id}`,
		method:'get',
		data:id
	})
}

export const updateCard = (addForm) => {
	return api.http({
		url:`/card/update`,
		method:'put',
		data:addForm
	})
}

export const deleteCardById = (id) => {
	return api.http({
		url:`/card/delete/id/${id}`,
		method:'delete',
	})
}

export const insertCardMultiple = (addForm) => {
	return api.http({
		url:'/card/insert/multiple',
		method:'put',
		data:addForm
	})
}

export const openCard = (params) => {
	return api.http({
		url:'/card/open/card',
		method:'get',
		params
	})
}