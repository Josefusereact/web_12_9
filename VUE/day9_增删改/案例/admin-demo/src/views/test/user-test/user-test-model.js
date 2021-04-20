import {
	getAllRoleList
} from "../../../api/role-api";
import {
	addUser,
	findUserById,
	getUserList,

	removeUserById,
	updateUser
} from "../../../api/user-api.js";


export default {
	namespaced: true,
	state: {
		list: [],
		page: {},
		roleList: []
	},
	mutations: {
		setList(state, list) {
			state.list = list
		},
		setPage(state, page) {
			state.page = page;
		},
		setRoleList(state, roleList) {
			state.roleList = roleList;
		}
	},
	//业务函数对象
	actions: {
		//根据业务名称定义异步函数
		async getListForPage({
			commit
		}, queryForm) {
			//在业务函数中执行接口调用函数,通过await来修饰
			let res = await getUserList(queryForm)
			//根据接口返回数据的结构，我们获取状态码进行判断
			if (res.data.code == 200) {
				//如果接口调用成功，我们就将当前的接口中list的数据赋给state中的list，通过commit执行
				commit('setList', res.data.data.list)
				commit('setPage', res.data.data.page)
			}
		},
		//接口为异步调用所以这里要用async修饰
		async getRoleList({
			commit
		}) {
			//调用接口函数查询角色列表
			let res = await getAllRoleList()
			if (res.data.code == 200) {
				//将返回的数据存到roleList中
				commit('setRoleList', res.data.data.list)
			}
		},
		async saveUser({
			commit
		}, user) {
			await addUser(user).catch(err => err);
		},
		async getUserById({
			commit
		}, id) {
			let res = await findUserById(id).catch(e => e);
			if (res.data.code === 200) {
				return res.data.data;
			} else {
				return {};
			}
		},
		async update({
			commit
		}, user) {
			await updateUser(user).catch(e => e);
		},
		async deleteUserById({
			commit
		}, id) {
			await removeUserById(id).catch(e => e);
		}
	},
};