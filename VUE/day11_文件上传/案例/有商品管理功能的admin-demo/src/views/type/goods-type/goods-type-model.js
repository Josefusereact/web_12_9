import {getGoodsTypeList} from '../../../api/goods-type-api'
export default {
    //model文件中必须使用namespaced为true来让model可以命名否则是无法注册到store中的
    namespaced:true,
    state:{
      list:[],//接口查回的table的数据
		page:{//接口返回的分页信息
			pno:1,
			psize:10,
			pCount:0,
			totalElements:0
		},
    },
    mutations:{
      setList(state,list){
        state.list = list
      },
      setPage(state,page){
        state.page = page
      }
    },
    getters:{},
    actions:{
      //以下是基础内容，剩下的自行根据需求添加
      async getListForPage({commit},queryForm){
        let res = await getGoodsTypeList(queryForm).catch(err=>err);
        if(res.data.code == 200){
            // 当接口返回的code为200时，将查询的结果list（列表数据）和page（分页信息）通过
            //调用对应的mutations中的函数设置到list和page中
            commit('setList',res.data.data.list)
            commit('setPage',res.data.data.page)
        }
      },
      async insert({commit},addForm){
        
      },
      async findById({commit},id){
        
      },
      async update({commit},addForm){
        
      },
      async deleteById({commit},id){
        
      },
    }
  }