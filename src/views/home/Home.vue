<template>
  <div id="home">
   <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行', '新款', '精选']"
                 @tabClick="tabClick"
                 ref="tabControl1"
                 class="tabControl" v-show="isTabFixed"/>
   <scroll class="content" ref="scroll"
           :probe-type="3"
           :click="true"
           :pullUpLoad="true"
           @scroll="contentScroll"
           @pullingUp="pullClick">
     <home-swiper :banner="banners" :interval='5000' @swiperImageLoad="swiperImageLoad"/>
     <recommend-view :recommends="recommend"/>
     <fea-ture/>
     <tab-control :titles="['流行', '新款', '精选']"
                  @tabClick="tabClick"
                  ref="tabControl2"/>
     <goods-list :goods="goods[currentType].list"/>
   </scroll>
    <back-top @click.native="backTop" v-show="isShow"/>
  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeaTure from './childComps/featureView'

  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backTop/BackTop'


  import {getHomeMultiData,getProductData} from 'network/home'
  import {debounce} from 'common/utils.js'
  import {itemListenerMixin,backTopMixin} from 'common/mixin.js'



  export default {
    name: "Home",
    components: {
      HomeSwiper,
      RecommendView,
      FeaTure,
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
    },
    mixins:[itemListenerMixin,backTopMixin],
    data(){
      return{
        banners:[],
        recommend:[],
        goods:{
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]},
        },
        currentType:'pop',
        tabOffsetTop:0,
        isTabFixed:false,
        saveY:0,


      }
    },
    activated(){
      this.$refs.scroll.scrollTo(0,this,0)
      this.$refs.scroll.refresh()
    },
    deactivated(){
      this.saveY = this.$refs.scroll.getScrollY()

      this.$bus.$off('itemImgLoad',this.itemImgListener)

    },
    created(){  //组件创建
      this.getHomeMultiData()

      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')




    },
    mounted(){
    },
    methods:{

      //监听管理

      tabClick(index){
        switch (index){
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },
      contentScroll(position){
        this.isShow = (-position.y)>1000
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      pullClick(){
        this.getHomeGoods(this.currentType)

      },
      swiperImageLoad(){
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      },



      //网络请求
      getHomeMultiData(){
        getHomeMultiData().then(res => {

          this.banners = res.data.data.banner.list
          this.recommend = res.data.data.recommend.list
        })
      },
      getHomeGoods(type){
        const page = this.goods[type].page+1
        getProductData(type,page).then(res =>{
          this.goods[type].list.push(...res.data.data.list)
          this.goods[type].page += 1
          this.$refs.scroll.finishedPullUp()
        })
      },

    }
  }

</script>

<style scoped>
  #home {

    height: 100vh;

  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

  }

  .content {
    overflow: hidden;
    position: absolute;
    top:44px;
    bottom: 49px;
    left: 0;
    right: 0;

  }
  .tabControl {
    position: relative;
    z-index: 9;
  }

</style>
