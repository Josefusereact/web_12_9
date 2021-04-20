import api from '../http'
// 商品类型分页
export const getGoodsTypeList = (data) => {
    return api.http({
        method: 'GET',
        url: '/goods-type/list/page',
        params: {
            pno: data.pno,
            psize: data.psize,
            name: data.name,
            remark: data.remark
        },
    })
}

// 商品类型添加
export const addGoodsType = (data) => {
    return api.http({
        method: "PUT",
        url: "/goods-type/insert",
        data: {
            "name": data.name,
            "remark": data.remark
        }
    })
}

// 商品类型修改 /goods-type/update
export const updateGoodsType = (data) => {
    return api.http({
        method: "PUT",
        url: "/goods-type/update",
        data: {
            "id": data.id,
            "name": data.name,
            "remark": data.remark
        }
    })
}

// 商品类型通过id查找，夜宵加载load   /goods-type/find/id/${id}
export const getGoodsTypeById = (id) => {
    return api.http({
        method: "GET",
        url: `/goods-type/find/id/${id}`,
    })
}

// 商品类型删除  /goods-type/delete/id/${id}
export const deleteGoodsTypeById = (id) => {
    return api.http({
        method: "DELETE",
        url: `/goods-type/delete/id/${id}`,
    })
}