import api from "../http/index.js"

//商品查询
export const getGoodsList = (params) => {
    return api.http({
        method: 'GET',
        url: '/goods/list/page',
        params
    })
}

export const insert = (data) => {
    return api.http({
        method: 'PUT',
        url: '/goods/insert',
        data
    })
}

export const loadById = (id) => {
    return api.http({
        method: 'GET',
        url: `/goods/find/id/${id}`
    })
}

export const update = (data) => {
    return api.http({
        method: 'PUT',
        url: '/goods/update',
        data
    })
}

export const remove = (id) => {
    return api.http({
        method: "DELETE",
        url: `/goods/delete/id/${id}`
    })
}

export const upOrDown = (params) => {
    return api.http({
        method: 'GET',
        url: `/goods/set/onsale`,
        params: {
            id: params.id,
            isOnSale: params.isOnSale
        }
    })
}