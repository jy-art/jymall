<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>

    <scroll class="content" ref="scroll" :probeType="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages" />
      <detail-baseInfo :goods="goods"/>
      <detail-shopInfo :shop="shop"/>
      <detail-goodsInfo :detailInfo="detailInfo" @imgLoad="imgLoad"/>
      <detail-paramInfo :paramInfo="paramInfo" ref="params"/>
      <detail-commentInfo :commentInfo ="commentInfo" ref="comments"/>
      <goods-list :goods="recommend" ref="recommends"/>
    </scroll>
    <back-top v-show="isShow" @click.native="backTop"/>
    <detail-bottomBar @addToCart="addToCart" ref="add"/>



  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import detailSwiper from './childComps/detailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from  './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'
import GoodsList from 'components/content/goods/GoodsList'
import GoodsListItem from 'components/content/goods/GoodsListItem'


import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail'
import {itemListenerMixin,backTopMixin} from 'common/mixin.js'


  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      detailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      Scroll,
      BackTop,
      GoodsList,
      GoodsListItem,
    },
    mixins:[itemListenerMixin,backTopMixin],
    data() {
      return {
        id:null,
        topImages:[],
        goods:{},
        shop:{},
        detailInfo:{},
        paramInfo:{},
        commentInfo:{},
        recommend:[],
        themeTopYs:[],
        currentIndex:0,
      }
    },
    created(){
      this.id = this.$route.params.iid
      this.getDetail()
    },
    mounted(){},
    updated(){

    },
    destroyed(){
      this.$bus.$off('itemImgLoad',this.itemImgListener)
    },
    methods:{
      getDetail(){
        getDetail(this.id).then( res =>{
          const data = res.data.result
            //取出轮播图信息
          this.topImages = data.itemInfo.topImages
          //创建商品对象
          this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
          //取出店铺信息
          console.log(this.goods);
          this.shop = new Shop(data.shopInfo)
          //取出详情信息
          this.detailInfo = data.detailInfo
          //  取出参数信息
          this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
          //取出评论信息
          if(data.rate.cRate !==0){
            this.commentInfo = data.rate.list[0]
          }
          getRecommend().then( res =>{
            console.log(res);
            this.recommend = res.data.data.list
          })


        })
      },
      imgLoad(){
        this.$refs.scroll.refresh()

        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comments.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommends.$el.offsetTop)
        this.themeTopYs.push(Number.MAX_VALUE)
      },
      titleClick(index){
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200)
      },
      contentScroll(position){
        this.isShow = (-position.y)>1000
        const positionY = -position.y
        let length = this.themeTopYs.length
        for(let i = 0; i<length-1;i++){
          if(this.currentIndex !==i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])){
            this.currentIndex =i
            console.log(this.currentIndex);
            this.$refs.nav.itemIndex = this.currentIndex
          }
        }
      },
      addToCart(){
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.realPrice
        product.id = this.id

        this.$store.dispatch('addCart',product).then(res =>{
            this.$toast.show(res,2000)
        })




      }
    }
  }

</script>

<style scoped>
  #detail {
    height: 100vh;
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .detail-nav{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content {
    position: absolute;
    bottom: 58px;
    top:44px;
    left: 0;
    right: 0;


  }
</style>