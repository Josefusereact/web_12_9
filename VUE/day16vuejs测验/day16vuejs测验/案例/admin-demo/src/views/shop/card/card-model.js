import {
    backCard,
    deleteCardById,
    getCardFindById,


    getCardListForPage,
    insertCard,


    insertCardMultiple,
    openCard,


    updateCard
} from '../../../api/card-api.js';
import {
    getCardTypeList
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
        cardTypeList: [],
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
            let res = await getCardListForPage(data);
            if (res.data.code == 200) {
                commit('setList', res.data.data.list);
                commit('setPage', res.data.data.page);
            }
        },
        async getCardTypeListAll({
            commit
        }) {
            let res = await getCardTypeList();
            commit('setCardTypeList', res.data.data.list)
        },
        async deleteById({}, id) {
            await deleteCardById(id);
        },
        async update({}, data) {
            await updateCard(data);
        },
        async insert({}, data) {
            await insertCard(data);
        },
        async insertMultiple({}, data) {
            await insertCardMultiple(data);
        },
        async findById({}, id) {
            let res = await getCardFindById(id);
            return res.data.data
        },
        async open({}, data) {
            await openCard(data);
        },
        async back({}, data) {
            await backCard(data);
        },
    }
}