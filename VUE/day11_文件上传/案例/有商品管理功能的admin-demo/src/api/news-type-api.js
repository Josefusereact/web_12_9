import api from '../http'
export const newsTypeListAll = () =>{
    return api.http({
        url:`/news-type/list/all`,
        method: 'get'
    })
}