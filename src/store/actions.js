import * as types from './mutation-types'

const actions = {
  addCart(context,payload){
    return new Promise((resolve,reject) => {
      let oldProduct = context.state.cartList.find(item => item.id === payload.id)
      if(oldProduct){
        context.commit('INCREMENT_COUNT',oldProduct)
        resolve('当前的商品数量+1')
      }else {
        payload.count = 1
        context.commit('ADD_TO_CART',payload)
        resolve('添加了新的商品')
      }
    })

  }
}

export default actions
