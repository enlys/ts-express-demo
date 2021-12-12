// 引入
import { createStore } from "vuex";
import axios from 'axios';

export default createStore({
  // 声明变量
  state: {
    "name": 'xxxxx',
    "Adata": null,
    "Bdata": {}
  },
  // 修改变量（state不能直接赋值修改，只能通过mutations）
  mutations: {
    // 参数一：state，参数二：新值
    getname(state, newValue){
      state.name = newValue
    },
    getAData(state, newValue){
      state.Adata = newValue
    },
    getBData(state, newValue){
      state.Bdata = newValue
    }
  },
  // mutations的值由actions传入
  actions: {
	// 参数一：自带属性，参数二：新值
    setName(context, value){
      // 修改getname的值
      context.commit('getname',value)
    },

    getA(context) {
      // 返回一个Promise函数
      return new Promise((reslove,reject)=>{
        // 请求
        axios.get('https://api.apiopen.top/recommendPoetry').then(res=>{
          // 修改getAData的值
          context.commit('getAData',res)
          reslove(res)
        }).catch(res=>{ reject(res) })
      })
    },

    getB(context) {
      return new Promise((reslove,reject)=>{
        axios.get('https://api.apiopen.top/recommendPoetry').then(res=>{
          context.commit('getBData',res)
          reslove(res)
        }).catch(res=>{ reject(res) })
      })
    }

  },
  modules: {},
});

