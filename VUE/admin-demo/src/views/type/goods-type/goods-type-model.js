import {
  getGoodsTypeList,
  addGoodsType,
  updateGoodsType,
  getGoodsTypeById,
  deleteGoodsTypeById,
} from "../../../api/goods-type-api";
export default {
    //model文件中必须使用namespaced为true来让model可以命名否则是无法注册到store中的
    namespaced:true,
    state:{
      list:[],
      page:[]
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
        let res = await getGoodsTypeList(queryForm).catch(err=>err);//res是response响应的意思
        if(res.data.code  == 200){
            //调用mutation
            commit('setList',res.data.data.list);//查询出来的列表数据
            commit('setPage',res.data.data.page);//给分页控件用的参数
        }
      },
      async insert({commit},addForm){
        await addGoodsType(addForm).catch(err => err);
      },
      async findById({commit},id){
        let res = await getGoodsTypeById(id).catch(err => err);//返回的json里包含我们要得对象
        if(res.data.code == 200){
            return res.data.data;//这个最后的data代表取出来的商品类型
        }
      },
      async update({commit},addForm){
        await updateGoodsType(addForm).catch(err => err)
      },
      async deleteById({commit},id){
        await deleteGoodsTypeById(id).catch(err=>err);
      },
    }
  }