<template>
  <div class="cart-list">
    <scroll class="content">
      <cart-list-item v-for="item in cartList" :key="item.id" :item-info="item"></cart-list-item>
    </scroll>
  </div>

</template>

<script>
  import Scroll from 'components/common/scroll/Scroll'
  import CartListItem from './CartListItem'

	export default {
		name: "CartList",
    components: {
		  Scroll, CartListItem
    },
    props: {
		  cartList: {
		    type: Array,
        default() {
		      return []
        }
      }
    }
	}
</script>

<style scoped>
  .cart-list{
    height: calc(100% - 44px - 49px);

  }
  .content {
    height: 100%;
    overflow: hidden;
  }
</style>
