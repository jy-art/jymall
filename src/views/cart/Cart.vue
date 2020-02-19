<template>
  <div id="cart">
    <nav-bar class="nav-bar"><div slot="center">购物车({{length}})</div></nav-bar>
    <cart-list :cartList="list"/>
    <bottom-bar/>
  </div>
</template>

<script>
  import CartList from './childComps/CartList.vue'
  import BottomBar from './childComps/BottomBar'

  import NavBar from 'components/common/navbar/NavBar'

  import {mapGetters} from 'vuex'

  export default {
    name: "Cart",
    components: {
      NavBar,
      CartList,
      BottomBar
    },
    computed: {
      ...mapGetters({
        length:'cartCount',
        list:'cartList'
      })
    }
  }
</script>

<style scoped>
  #cart {
    /*position: relative;*/
    height: 100vh;
  }

  .nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }

  .cart-list {
    position: absolute;
    top: 44px;
    bottom: 49px;
    width: 100%;
  }
</style>
