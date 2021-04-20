import {
    deleteShopUserById,
    getShopUserFindById,


    getShopUserListForPage,
    insertShopUser,
    setShopUserFreeze,


    updateShopUser
} from '../../../api/shop-user-api.js';
import {
    getUserTypeList
} from '../../../api/user-type-api';
export default {
    namespaced: true,
    state: {
        list: [],
        page: {
            pno: 1,
            psize: 10,
            pCount: 0,
            totalElements: 0
        },
        userTypeList: [],
    },
    mutations: {
        setList(state, list) {
            state.list = list;
        },
        setPage(state, page) {
            state.page = page;
        },
        setUserTypeList(state, userTypeList) {
            state.userTypeList = userTypeList;
        },
    },
    actions: {
        async getListForPage({
            commit
        }, data) {
            let res = await getShopUserListForPage(data);
            if (res.data.code == 200) {
                commit('setList', res.data.data.list);
                commit('setPage', res.data.data.page);
            }
        },
        async getUserTypeListAll({
            commit
        }) {
            let res = await getUserTypeList();
            commit('setUserTypeList', res.data.data.list)
        },
        async deleteById({}, id) {
            await deleteShopUserById(id);
        },
        async update({}, data) {
            await updateShopUser(data);
        },
        async insert({}, data) {
            await insertShopUser(data);
        },
        async findById({}, id) {
            let res = await getShopUserFindById(id);
            return res.data.data
        },
        async setStateFreeze({}, data) {
            await setShopUserFreeze(data);
        }
    }
}