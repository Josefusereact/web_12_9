import api from '../http';

export const getGoodsTypeListForPage = (queryForm) => {
    return api.http({
        url: '/goods-type/list/page',
        method: 'GET',
        params: queryForm
    })
}
export const insertGoodsType = (addForm) => {
    return api.http({
        url: '/goods-type/insert',
        method: 'PUT',
        data: addForm
    })
}
export const updateGoodsType = (addForm) => {
    return api.http({
        url: '/goods-type/update',
        method: 'PUT',
        data: addForm
    })
}
export const getGoodsTypeFindById = (id) => {
    return api.http({
        url: `/goods-type/find/id/${id}`,
        method: 'GET'
    })
}
export const deleteGoodsTypeById = (id) => {
    return api.http({
        url: `/goods-type/delete/id/${id}`,
        method: 'DELETE'
    })
}
export const getGoodsTypeListAll = () => {
    return api.http({
        url: '/goods-type/list/all',
        method: 'GET'
    })
}