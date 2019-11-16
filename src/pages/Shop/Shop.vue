<template>
  <div>
    <ShopHeader/>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/shop/goods">订餐</router-link>
      </div>
       <div class="tab-item">
        <router-link to="/shop/rating">评价</router-link>
      </div>
       <div class="tab-item">
        <router-link to="/shop/info">商家</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapState } from 'vuex'
  import ShopHeader from '../../components/ShopHeader/ShopHeader'
  import {SAVE_SHOPDATAS ,SAVE_SHOPSCART} from '../../store/mutation-types'
  export default {
    components:{ ShopHeader },
    computed:{
      ...mapState({
        shopDatas: state => state.shop.shopDatas,
        shopsCart: state => state.shop.shopsCart
      })
    },
    mounted(){
      // 读取sessionStorage中是否有之前存储的数据
      if(sessionStorage.getItem('shopDatas')){
        // 之前有值
        let shopDatas = JSON.parse(sessionStorage.getItem('shopDatas'))
        let shopsCart = shopDatas.goods.reduce((pre, good) => {
          pre.push(...good.foods.filter(food => food.count))
          return pre
        }, [])
       //将获取的值存入store中
       this.$store.commit(SAVE_SHOPDATAS,{shopDatas})
       this.$store.commit(SAVE_SHOPSCART,{shopsCart})
      }else{
        // 之前没有值
        this.$store.dispatch('getShopDatasAction')
      }
      window.addEventListener('beforeunload',()=>{
         sessionStorage.setItem('shopDatas',JSON.stringify(this.shopDatas))
        //  sessionStorage.setItem('shopsCart',JSON.stringify(this.shopsCart))
      })
    },
    
    beforeDestroy(){
      sessionStorage.setItem('shopDatas',JSON.stringify(this.shopDatas))
    }
  }
</script>

<style lang='stylus' rel='stylesheet/stylus' scoped>
@import "../../common/stylus/mixins.styl"
  .tab
    height 40px
    line-height 40px
    background #fff
    bottom-border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      float left
      width: 33.33333%
      text-align center
      font-size 14px
      color rgb(77, 85, 93)
      a
        display block
        position relative
        &.router-link-active
          color deepskyblue
          &::after
            content ''
            position absolute
            left 50%
            bottom 1px
            width 35px
            height 2px
            transform translateX(-50%)
            background deepskyblue
 
</style>
