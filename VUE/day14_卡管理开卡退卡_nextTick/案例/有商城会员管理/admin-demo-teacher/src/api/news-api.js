import api from '../http'

export const getNewsListForPage = (queryForm) => {
	return api.http({
		url:'/news/list/page',
		method:'get',
		params:queryForm
	})
}

export const insertNews = (addForm) => {
	return api.http({
		url:'/news/insert',
		method:'put',
		data:addForm
	})
}

export const findNewsById = (id) => {
	return api.http({
		url:`/news/find/id/${id}`,
		method:'get',
		data:id
	})
}

export const updateNews = (addForm) => {
	return api.http({
		url:`/news/update`,
		method:'put',
		data:addForm
	})
}

export const deleteNewsById = (id) => {
	return api.http({
		url:`/news/delete/id/${id}`,
		method:'delete',
	})
}
