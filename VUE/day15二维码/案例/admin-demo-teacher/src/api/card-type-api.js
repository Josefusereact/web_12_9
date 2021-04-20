import api from '../http'

export const getCardTypeList = () => {
	return api.http({
		url:'/card-type/list/all',
		method:'get'
	})
}