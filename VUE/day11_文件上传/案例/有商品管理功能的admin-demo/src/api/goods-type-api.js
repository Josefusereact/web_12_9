import api from '../http'
export const goodsTypeListAll = () => {
    return api.http({
        url: `/goods-type/list/all`,
        method: 'get'
    })
}