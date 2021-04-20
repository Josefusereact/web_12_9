import api from '../http'

export const getCouponTypeList = () => {
	return api.http({
		url:'/coupon-type/list/all',
		method:'get'
	})
}


export const getCouponTypeListForPage = (queryForm) => {
	return api.http({
		url:'/coupon-type/list/page',
		method:'get',
		params:queryForm
	})
}

export const insertCouponType = (addForm) => {
	return api.http({
		url:'/coupon-type/insert',
		method:'put',
		data:addForm
	})
}

export const findCouponTypeById = (id) => {
	return api.http({
		url:`/coupon-type/find/id/${id}`,
		method:'get',
		data:id
	})
}

export const updateCouponType = (addForm) => {
	return api.http({
		url:`/coupon-type/update`,
		method:'put',
		data:addForm
	})
}

export const deleteCouponTypeById = (id) => {
	return api.http({
		url:`/coupon-type/delete/id/${id}`,
		method:'delete',
	})
}



