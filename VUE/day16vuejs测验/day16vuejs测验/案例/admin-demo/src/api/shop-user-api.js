import api from '../http';

export const getShopUserListForPage = (queryForm) => {
    return api.http({
        url: '/shop-user/list/page',
        method: 'GET',
        params: queryForm
    })
}
export const insertShopUser = (addForm) => {
    return api.http({
        url: '/shop-user/insert',
        method: 'PUT',
        data: addForm
    })
}
export const updateShopUser = (addForm) => {
    return api.http({
        url: '/shop-user/update',
        method: 'PUT',
        data: addForm
    })
}
export const getShopUserFindById = (id) => {
    return api.http({
        url: `/shop-user/find/id/${id}`,
        method: 'GET'
    })
}
export const deleteShopUserById = (id) => {
    return api.http({
        url: `/shop-user/delete/id/${id}`,
        method: 'DELETE'
    })
}
export const getShopUserListAll = () => {
    return api.http({
        url: '/shop-user/list/all',
        method: 'GET'
    })
}

export const setShopUserFreeze = (freezeData) => {
    return api.http({
        url: '/shop-user/set/freeze',
        method: 'GET',
        params: freezeData
    })
}