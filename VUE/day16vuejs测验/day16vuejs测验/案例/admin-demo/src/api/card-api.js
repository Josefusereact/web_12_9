import api from '../http';

export const getCardListForPage = (queryForm) => {
    return api.http({
        url: '/card/list/page',
        method: 'GET',
        params: queryForm
    })
}
export const insertCard = (addForm) => {
    return api.http({
        url: '/card/insert',
        method: 'PUT',
        data: addForm
    })
}
export const updateCard = (addForm) => {
    return api.http({
        url: '/card/update',
        method: 'PUT',
        data: addForm
    })
}
export const getCardFindById = (id) => {
    return api.http({
        url: `/card/find/id/${id}`,
        method: 'GET'
    })
}
export const deleteCardById = (id) => {
    return api.http({
        url: `/card/delete/id/${id}`,
        method: 'DELETE'
    })
}
export const getCardListAll = () => {
    return api.http({
        url: '/card/list/all',
        method: 'GET'
    })
}

export const openCard = (params) => {
    return api.http({
        url: '/card/open/card',
        method: 'GET',
        params
    })
}
export const backCard = (params) => {
    return api.http({
        url: '/card/back/card',
        method: 'GET',
        params
    })
}

export const insertCardMultiple = (addForm) => {
    return api.http({
        url: '/card/insert/multiple',
        method: 'PUT',
        data: addForm
    })
}
