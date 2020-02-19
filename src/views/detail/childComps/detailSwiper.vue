<template>
    <swiper v-if="topImages.length">
      <swiper-item v-for="item in topImages" class="item">
        <img :src="item" alt="">
      </swiper-item>
    </swiper>
</template>

<script>

  import {Swiper,SwiperItem} from 'components/common/swiper'
  export default {
    name: 'detailSwiper',
    props:{
      topImages:{
        type:Array,
        default(){
          return []
        }
      }
    },
    components:{
      Swiper,
      SwiperItem
    }
  }
</script>

<style scoped>
  .item{
    height: 300px;
    overflow: hidden;
  }
</style>
