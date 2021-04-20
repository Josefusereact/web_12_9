import api from '../http';

// 分页查询
export const getCardListForPage = (queryForm) => {
    return api.http({
        method: 'GET',
        url: '/card/list/page',
        params: queryForm
    })
}

// 添加一条
export const insertCard = (addForm) => {
    return api.http({
        method: 'PUT',
        url: '/card/insert',
        data: addForm
    })
}

// 根据id查找card数据
export const findCardById = (id) => {
    return api.http({
        method: 'GET',
        url: `/card/find/id/${id}`,
        params: id
    })
}

// 修改卡数据
export const updateCardById = (addForm) => {
    return api.http({
        method: 'PUT',
        url: '/card/update',
        data: addForm
    })
}

// 根据数据id删除数据
export const deleteCardById = (id) => {
    return api.http({
        method: 'DELETE',
        url: `/card/delete/id/${id}`,
        data: id
    })
}

//卡类型
export const getCardTypeList = () => {
    return api.http({
        method: 'GET',
        url: '/card-type/list/all',
    })
}