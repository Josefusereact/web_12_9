import api from '../http'
export const getNewsList = (data) => {
	return api.http({
		url:'/news/list/page',
		params:{
			pno:data.pno,
			psize:data.psize,
			name:data.name,
            newsTypeId: data.newsTypeId
		},
		method:'get'
	})
}
export const addNews = (data)=>{
    return api.http({
		url:`/news/insert`,
		method:'put',
		data
	})
}
export const delNews = (id)=>{
    return api.http({
        url:`/news/delete/id/${id}`,
        method:'delete',
    })
}
export const loadNews = (id)=>{
    return api.http({
        url:`/news/find/id/${id}`,
		method:'get',
    });
}
export const updateNews = (data)=>{
    return api.http({
		url:`/news/update`,
		method:'put',
		data
	})
}