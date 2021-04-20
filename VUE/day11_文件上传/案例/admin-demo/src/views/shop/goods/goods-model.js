import {
    getGoodsList,
    insert,
    loadById,
    remove,
    update,
    upOrDown
} from '../../../api/goods-api';
import {
    getGoodsTypeAll
} from '../../../api/goods-type-api.js';
// module export  ====>  nodejs
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
        goodsTypeList: [] //商品分类数据
    },
    mutations: {
        setList(state, list) {
            state.list = list;
        },
        setPage(state, page) {
            state.page = page;
        },
        setGoodsTypeList(state, list) {
            state.goodsTypeList = list;
        }
    },
    actions: {
        //函数的第二个参数，才是你要给http传的参数
        async getListForPage({
            commit
        }, queryForm) {
            let res = await getGoodsList(queryForm).catch(e => e);
            if (res.data.code == 200) {
                commit('setList', res.data.data.list);
                commit('setPage', res.data.data.page);
            }
        },
        async getGoodsTypeList({
            commit
        }) {
            let res = await getGoodsTypeAll().catch(e => e);
            if (res.data.code == 200) {
                commit('setGoodsTypeList', res.data.data.list);
            }
        },
        async addGoods(context, addForm) {
            await insert(addForm).catch(e => e);
        },
        async loadGoodsById(context, id) {
            let res = await loadById(id).catch(e => e);
            console.log(res.data.data);
            return res.data.data
        },
        async updateGoods(context, addForm) {
            await update(addForm).catch(e => e);
        },
        async deleteGoods(context, id) {
            await remove(id).catch(e => e);
        },
        async isOnSale(context, params) {
            await upOrDown(params)
        }
    }
}