<template>
  <div>
   <nav-bar>
     <div slot="left" class="back" @click="baClick">
       <img src="~assets/img/common/back.svg" alt="">
     </div>
     <div slot="center" class="title">
       <div v-for="(item,index) in titles"
            class="title-item"
            :class="{'active':index === itemIndex}"
           @click="clickTitle(index)">
         {{item}}</div>
     </div>
   </nav-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'

  export default {
    name: 'DetailNavBar',
    components:{
      NavBar
    },
    data(){
      return{
        titles:['商品','参数','评论','推荐'],
        itemIndex:0
      }
    },
    methods:{
      clickTitle(index){
        this.itemIndex = index;
        this.$emit('titleClick',index)
      },
      baClick(){
        this.$router.back()
      }
    }
  }

</script>

<style scoped>
  .title{
    display: flex;
    font-size: 16px;
  }
  .title-item{
    flex: 1;
  }
  .active{
    color: var(--color-high-text);
  }
  .back{
    margin-top: 8px;
  }
</style>
