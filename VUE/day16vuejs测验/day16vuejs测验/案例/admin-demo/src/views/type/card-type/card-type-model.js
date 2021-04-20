import {
    deleteCardTypeById,
    getCardTypeFindById,


    getCardTypeListForPage,
    insertCardType,
    updateCardType
} from '../../../api/card-type-api.js';
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
        cardTypeList: []
    },
    mutations: {
        setList(state, list) {
            state.list = list;
        },
        setPage(state, page) {
            state.page = page;
        },
        setCardTypeList(state, cardTypeList) {
            state.cardTypeList = cardTypeList;
        },
    },
    actions: {
        async getListForPage({
            commit
        }, data) {
            let res = await getCardTypeListForPage(data);
            if (res.data.code == 200) {
                commit('setList', res.data.data.list);
                commit('setPage', res.data.data.page);
            }
        },
        async deleteById({}, id) {
            await deleteCardTypeById(id);
        },
        async update({}, data) {
            await updateCardType(data);
        },
        async insert({}, data) {
            await insertCardType(data);
        },
        async findById({}, id) {
            let res = await getCardTypeFindById(id);
            return res.data.data
        }
    }
}