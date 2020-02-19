<template>
      <Swiper :interval=interval v-if="banner.length">
        <swiper-item v-for="(item,n) in banner ">
          <a :href="item.link">
            <img :src="item.image" alt="" @load="imgLoad">
          </a>
        </swiper-item>
      </Swiper>
</template>

<script>

  import {Swiper,SwiperItem} from 'components/common/swiper'
  export default {
    name: 'HomeSwiper',
    props:{
      banner:{
        type:Array,
        default(){
          return []
        }
      },
      interval:{
        type:Number,
        default:5000
      }
    },
    components:{
      Swiper,
      SwiperItem
    },
    data(){
      return {
        isLoad:false
      }
    },
    methods:{
      imgLoad(){
          if(!this.isLoad){
          this.$emit('swiperImageLoad')
          this.isLoad = true
        }
      }

    }
  }
</script>

<style>

</style>
