import api from '../http';

export const getUserTypeListForPage = (queryForm) => {
    return api.http({
        url: '/user-type/list/page',
        method: 'GET',
        params: queryForm
    })
}
export const insertUserType = (addForm) => {
    return api.http({
        url: '/user-type/insert',
        method: 'PUT',
        data: addForm
    })
}
export const updateUserType = (addForm) => {
    return api.http({
        url: '/user-type/update',
        method: 'PUT',
        data: addForm
    })
}
export const getUserTypeFindById = (id) => {
    return api.http({
        url: `/user-type/find/id/${id}`,
        method: 'GET'
    })
}
export const deleteUserTypeById = (id) => {
    return api.http({
        url: `/user-type/delete/id/${id}`,
        method: 'DELETE'
    })
}
export const getUserTypeList = () => {
    return api.http({
        url: '/user-type/list/all',
        method: 'GET'
    })
}