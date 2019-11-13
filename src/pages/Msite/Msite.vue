<template>
 <section class="msite">
        <GshopHeader :title="address.name?address.name:'定位中...'">
           <span class="header_search" slot="left">
              <i class="iconfont icon-Magnifier"></i>
            </span>
        <template v-slot="right">
            <span class="header_login" >
              <span class="header_login_text" @click="login">{{user._id?user.name:'登录|注册'}}</span>
            </span>
        </template>
        </GshopHeader>
        <!--首页导航-->
        <nav class="msite_nav">
          <div class="swiper-container">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(category,index) in newCategories" :key="index">
                <a href="javascript:" class="link_to_food" v-for="(categoryItem,index) in category" :key="index"> 
                  <div class="food_container">
                    <img :src="`https://fuss10.elemecdn.com${categoryItem.image_url}`">
                  </div>
                  <span>{{categoryItem.title}}</span>
                </a>
              </div>
            </div>
            <!-- Add Pagination -->
            <div class="swiper-pagination"></div>
          </div>
        </nav>
        <!--首页附近商家-->
        <Shops/> 
      </section>
</template>

<script type="text/ecmascript-6">
import _ from 'lodash'
import Swiper from 'swiper'
import 'swiper/css/swiper.min.css'
import {mapState} from 'vuex'

import Shops from '../../components/Shops/Shops'
  export default {
      name:'Msite',
     components:{Shops},
      mounted(){
        if(this.address.address){
          return
        }else{
            this.$store.dispatch('getAddressAction')
        }
       this.$store.dispatch('getCategoriesAction',()=>{
          this.$nextTick(()=>{ //$nextTick代表下一次页面全部渲染完毕
          new Swiper('.swiper-container',{
            loop:true,
            pagination:{
              el:'.swiper-pagination'
         }
       })
         })
       })

       
     },
     methods:{
       _chunk(target,size){
         if(!Array.isArray(target)|| size<=0||!!!target.length) return
         let arr=[...target]
         let result =[]
         while(arr.length>size){
           result.push(arr.splice(0,size))
         }
         result.push(arr)
         return result
       },
       login(){
         if(this.user._id){
           return
         }else{
           this.$router.replace('/login')
         }
       }
     },
     computed:{
       ...mapState({
         address: state => state.address,
         categories:state=>state.categories,
         user:state => state.user
       }),
      newCategories(){
        return _.chunk(this.categories, 8) // lodash
        // return this._chunk(this.categorys, 8) //自己封装额
      }
     },
     watch:{
       categories(){
        //  监视swiper作用元素需要的对象上
      //    this.$nextTick(()=>{ //$nextTick代表下一次页面全部渲染完毕
      //     new Swiper('.swiper-container',{
      //       loop:true,
      //       pagination:{
      //         el:'.swiper-pagination'
      //    }
      //  })
      //    })
       }
     },
  }
</script>

<style lang='stylus' rel='stylesheet/stylus' scoped>
@import '../../common/stylus/mixins.styl'
.msite  //首页
  width 100%
  .msite_nav
    bottom-border-1px(#e4e4e4)
    margin-top 45px
    height 200px
    background #fff
    .swiper-container
      width 100%
      height 100%
      .swiper-wrapper
        width 100%
        height 100%
        .swiper-slide
          display flex
          justify-content center
          align-items flex-start
          flex-wrap wrap
          height 100%
          .link_to_food
            width 25%
            .food_container
              display block
              width 100%
              text-align center
              padding-bottom 10px
              font-size 0
              img
                display inline-block
                width 50px
                height 50px
            span
              display block
              width 100%
              text-align center
              font-size 13px
              color #666
      /deep/.swiper-pagination
        >span.swiper-pagination-bullet-active
          background deepskyblue
  
</style>
