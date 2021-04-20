import api from '../http';

// 新闻分页查询列表
export const getNewsListForPage = (queryForm) => {
    return api.http({
        url: '/news/list/page',
        method: 'get',
        params: queryForm
    })
}

// 添加新闻
export const insertNews = (addForm) => {
    return api.http({
        url: '/news/insert',
        method: 'put',
        data: addForm
    })
}

// 根据id查询新闻
export const findNewsById = (id) => {
    return api.http({
        url: `/news/find/id/${id}`,
        method: 'get',
        data: id
    })
}

// 编辑新闻
export const updateNews = (addForm) => {
    return api.http({
        url: `/news/update`,
        method: 'put',
        data: addForm
    })
}

// 删除新闻
export const deleteNewsById = (id) => {
    return api.http({
        url: `/news/delete/id/${id}`,
        method: 'delete',
    })
}