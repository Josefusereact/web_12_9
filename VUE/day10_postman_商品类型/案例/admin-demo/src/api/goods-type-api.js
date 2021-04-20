import api from '../http'
export const getGoodsTypeList = (data) => {
	return api.http({
		url:'/goods-type/list/page',
		params:{
			pno:data.pno,
			psize:data.psize,
			name:data.name,
            remark: data.remark
		},
		method:'get'
	})
}