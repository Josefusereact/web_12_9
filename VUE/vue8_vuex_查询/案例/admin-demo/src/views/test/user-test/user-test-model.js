import {
    getUserList
} from "../../../api/user-api";
//粘贴到user-test-model.js中
export default {
    namespaced: true, //允许模块命名
    state: { //定义模块的属性
        list: [],
        page: {}
    },
    mutations: { //定义为list赋值的方法
        setList(state, list) {
            state.list = list
        },
        setPage(state, page) {
            state.page = page
        }
    },
    actions: {
        async getListForPage({
            commit
        }, queryForm) {
            let res = await getUserList(queryForm);
            if (res.data.code == 200) {
                commit('setList', res.data.data.list);
                commit('setPage', res.data.data.page);
            } else {
                console.log("查询用户列表崩了");
            }
        }
    }
}