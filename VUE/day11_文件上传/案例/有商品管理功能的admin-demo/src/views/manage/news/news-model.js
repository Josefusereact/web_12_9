import {newsTypeListAll} from '../../../api/news-type-api';
import {getNewsList, addNews, delNews, loadNews, updateNews} from '../../../api/news-api';

export default{
    namespaced:true,
    state:{
        list:[],//接口查回的table的数据
		page:{//接口返回的分页信息
			pno:1,
			psize:10,
			pCount:0,
			totalElements:0
		},
		newsTypeList:[]//商品类型列表
    },
    mutations:{
        // 设置state中的list数据
		setList(state,list){
			state.list = list;
		},
		// 设置state中的page数据
		setPage(state,page){
			state.page = page
		},
        setNewsTypeList(state, newsTypeList){
            state.newsTypeList = newsTypeList;
        },
        
    },
    getters:{
		getList(state,getter){
			return state.list
		}
	},
    actions:{
        async getListForPage({commit},data){
			// 调用用户的分页查询接口
			let res = await getNewsList(data);
			if(res.data.code == 200){
				// 当接口返回的code为200时，将查询的结果list（列表数据）和page（分页信息）通过
				//调用对应的mutations中的函数设置到list和page中
				commit('setList',res.data.data.list)
				commit('setPage',res.data.data.page)
			}
		},
		async getNewsTypeAll({commit}, data){
			let res = await newsTypeListAll();
			if(res.data.code == 200){
				commit('setNewsTypeList',res.data.data.list);
			}
		},
		async insert({}, addForm){
			await addNews(addForm);
		},
		async delete({}, id){
			await delNews(id);
		},
		async setSale({}, params){
			console.log(params);
			await setOnSale(params.id, params.isOnSale);
		},
		async getGoodsType({},id){
			let res = await loadNews(id);
			if(res.data.code == 200 ){
				return res.data.data
			}
		},
		async update({}, addForm){
			await updateNews(addForm);
		}
    }
}