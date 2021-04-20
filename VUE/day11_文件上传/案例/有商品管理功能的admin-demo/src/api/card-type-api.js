import api from '../http/'
export const getCardTypeAll = ()=>{
    return api.http({
        method:'get',
        url:`/card-type/list/all`
    });
}