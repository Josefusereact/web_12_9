import api from '../http/index'

export const getCardListPage = (data) => {
    return api.http({
        method:'get',
        url:`/card/list/page`,
        params:{
            pno: data.pno,
            psize: data.psize,
            name:data.name,
            num: data.num,
            cardTypeId: data.cardTypeId
        }
    });
}
export const addCard = (data)=>{
    return api.http({
		url:`/card/insert`,
		method:'put',
		data
	})
}
export const delCard = (id)=>{
    return api.http({
        url:`/card/delete/id/${id}`,
        method:'delete',
    })
}
export const loadCard = (id)=>{
    return api.http({
        url:`/card/find/id/${id}`,
		method:'get',
    });
}
export const updateCard = (data)=>{
    return api.http({
		url:`/card/update`,
		method:'put',
		data
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
export const backCard = (num) =>{
    return api.http({
        method:'get',
        url:'/card/back/card',
        params:{num}
    });
}