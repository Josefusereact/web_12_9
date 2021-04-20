import {
    getCardListPage,
    addCard,
    delCard,
    loadCard,
    updateCard,
    insertCardMultiple,
    openCard,
    backCard
} from '../../../api/card-api.js';
import {
    getCardTypeAll
} from '../../../api/card-type-api'

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
        }
    },
    getters: {
        getList(state, getter) {
            return state.list;
        }
    },
    actions: {
        async getListForPage({
            commit
        }, data) {
            let res = await getCardListPage(data);
            if (res.data.code == 200) {
                commit('setList', res.data.data.list)
                commit('setPage', res.data.data.page)
            }
        },
        async getCardTypeList({
            commit
        }, data) {
            let res = await getCardTypeAll();
            if (res.data.code == 200) {
                commit('setCardTypeList', res.data.data.list)
            }
        },
        async insert({}, addForm) {
            await addCard(addForm);
        },
        async delete({}, id) {
            await delCard(id);
        },
        async getCardById({}, id) {
            let res = await loadCard(id);
            if (res.data.code == 200) {
                return res.data.data
            }
        },
        async update({}, addForm) {
            await updateCard(addForm);
        },
        async insertMultiple({}, addForm) {
            await insertCardMultiple(addForm)
        },
        async open({}, params) {
            await openCard(params)
        },
        async back({}, params){
            await backCard(params)
        }
    }
}