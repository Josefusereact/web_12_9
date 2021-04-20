import api from '../http'

export const getUserTypeList = () => {
	return api.http({
		url:'/user-type/list/all',
		method:'get'
	})
}


export const getUserTypeListForPage = (queryForm) => {
	return api.http({
		url:'/user-type/list/page',
		method:'get',
		params:queryForm
	})
}

export const insertUserType = (addForm) => {
	return api.http({
		url:'/user-type/insert',
		method:'put',
		data:addForm
	})
}

export const findUserTypeById = (id) => {
	return api.http({
		url:`/user-type/find/id/${id}`,
		method:'get',
		data:id
	})
}

export const updateUserType = (addForm) => {
	return api.http({
		url:`/user-type/update`,
		method:'put',
		data:addForm
	})
}

export const deleteUserTypeById = (id) => {
	return api.http({
		url:`/user-type/delete/id/${id}`,
		method:'delete',
	})
}


