import * as types from './mutation-types'

const mutations = {
  INCREMENT_COUNT(state,oldProduct){
    oldProduct.count +=1
  },
  ADD_TO_CART(state,payload){
    payload.checked = true
    state.cartList.push(payload)
  }
}


export default mutations
