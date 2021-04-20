import api from '../http'
export const getCardListForPage = (data) => {
    return api.http({
        url: '/card/list/page',
        method: 'get',
        params: data
    })
}
export const deleteCardById = (id) => {
    return api.http({
        url: `card/delete/id/${id}`,
        method: 'delete',
    })
}
export const insertCard = (data) => {
    return api.http({
        url: '/card/insert',
        method: 'put',
        data
    })
}
export const updateCard = (data) => {
    return api.http({
        url: '/card/update',
        method: 'put',
        data
    })
}
export const findCardById = (id) => {
    return api.http({
        url: `/card/find/id/${id}`,
        method: 'get'
    })
}
export const getCardListAll = () => {
    return api.http({
        url: '/card-type/list/all',
        method: 'get'
    })
}
export const insertCardMultiple = (addForm) => {
    return api.http({
        url: '/card/insert/multiple',
        method: 'put',
        data: addForm
    })
}
export const openCard = (params) => {
    return api.http({
        url: '/card/open/card',
        method: 'get',
        params
    })
}
export const backCard = (params) => {
    return api.http({
        url: '/card/back/card',
        method: 'get',
        params
    })
}