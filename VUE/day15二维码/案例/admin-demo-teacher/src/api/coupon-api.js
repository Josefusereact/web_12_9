import api from '../http'

export const getCouponListForPage = (queryForm) => {
	return api.http({
		url: '/coupon/list/page',
		method: 'get',
		params: queryForm
	})
}

export const insertCoupon = (addForm) => {
	return api.http({
		url: '/coupon/insert',
		method: 'put',
		data: addForm
	})
}

export const findCouponById = (id) => {
	return api.http({
		url: `/coupon/find/id/${id}`,
		method: 'get',
		data: id
	})
}

export const updateCoupon = (addForm) => {
	return api.http({
		url: `/coupon/update`,
		method: 'put',
		data: addForm
	})
}

export const deleteCouponById = (id) => {
	return api.http({
		url: `/coupon/delete/id/${id}`,
		method: 'delete',
	})
}

export const insertMultiple = (data) => {
	return api.http({
		url: '/coupon/insert/multiple',
		method: 'PUT',
		data
	})
}