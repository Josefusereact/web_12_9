import {
    deleteGoodsTypeById,
    getGoodsTypeFindById,


    getGoodsTypeListForPage,
    insertGoodsType,
    updateGoodsType
} from '../../../api/goods-type-api.js';
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
        goodsTypeList: []
    },
    mutations: {
        setList(state, list) {
            state.list = list;
        },
        setPage(state, page) {
            state.page = page;
        },
        setGoodsTypeList(state, goodsTypeList) {
            state.goodsTypeList = goodsTypeList;
        },
    },
    actions: {
        async getListForPage({
            commit
        }, data) {
            let res = await getGoodsTypeListForPage(data);
            if (res.data.code == 200) {
                commit('setList', res.data.data.list);
                commit('setPage', res.data.data.page);
            }
        },
        async deleteById({}, id) {
            await deleteGoodsTypeById(id);
        },
        async update({}, data) {
            await updateGoodsType(data);
        },
        async insert({}, data) {
            await insertGoodsType(data);
        },
        async findById({}, id) {
            let res = await getGoodsTypeFindById(id);
            return res.data.data
        }
    }
}