import {
    deleteUserTypeById,
    getUserTypeFindById,


    getUserTypeListForPage,
    insertUserType,
    updateUserType
} from '../../../api/user-type-api.js';
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
        userTypeList: []
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
            let res = await getUserTypeListForPage(data);
            if (res.data.code == 200) {
                commit('setList', res.data.data.list);
                commit('setPage', res.data.data.page);
            }
        },
        async deleteById({}, id) {
            await deleteUserTypeById(id);
        },
        async update({}, data) {
            await updateUserType(data);
        },
        async insert({}, data) {
            await insertUserType(data);
        },
        async findById({}, id) {
            let res = await getUserTypeFindById(id);
            return res.data.data
        }
    }
}