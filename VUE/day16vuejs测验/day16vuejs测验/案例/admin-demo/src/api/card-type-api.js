import api from '../http';

export const getCardTypeListForPage = (queryForm) => {
    return api.http({
        url: '/card-type/list/page',
        method: 'GET',
        params: queryForm
    })
}
export const insertCardType = (addForm) => {
    return api.http({
        url: '/card-type/insert',
        method: 'PUT',
        data: addForm
    })
}
export const updateCardType = (addForm) => {
    return api.http({
        url: '/card-type/update',
        method: 'PUT',
        data: addForm
    })
}
export const getCardTypeFindById = (id) => {
    return api.http({
        url: `/card-type/find/id/${id}`,
        method: 'GET'
    })
}
export const deleteCardTypeById = (id) => {
    return api.http({
        url: `/card-type/delete/id/${id}`,
        method: 'DELETE'
    })
}
export const getCardTypeList = () => {
    return api.http({
        url: '/card-type/list/all',
        method: 'GET'
    })
}