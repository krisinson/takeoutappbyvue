<template>
  <div id="footerGuideContainer">
    <div class="guideItem" :class="{active:$route.path==='/msite'}" @click="toPath('/msite')">
      <span>
        <i class="iconfont icon-_waimai"></i>
      </span>
      <span>首页</span>
    </div>
    <div class="guideItem" :class="{active:$route.path==='/search'}" @click="toPath('/search')">
      <span>
        <i class="iconfont icon-Magnifier"></i>
      </span>
      <span>搜索</span>
    </div>
    <div class="guideItem" :class="{active:$route.path==='/order'}" @click="toPath('/order')">
      <span>
        <i class="iconfont icon-dingdan"></i>
      </span>
      <span>订单</span>
    </div>
    <div class="guideItem" :class="{active:$route.path==='/profile'}" @click="toPath('/profile')">
      <span>
        <i class="iconfont icon-wode"></i>
      </span>
      <span>我的</span>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  methods: {
    toPath(path) {
      this.$route.path !== path && this.$router.replace(path)
    }
  }
}
</script>

<style lang='stylus' rel='stylesheet/stylus' scoped>
@import '../../common/stylus/mixins.styl'
#footerGuideContainer
	position fixed
	left 0
	bottom 0
	width 100%
	height 50px
	border-top 1px solid #eee
	box-sizing border-box
	display flex
	background #fff
	.guideItem
		width 25%
		height 100%
		text-align center
		display flex
		flex-direction column
		span
			i
				font-size 22px
			&:first-child
				margin 6px 
				
		&.active
			color deepskyblue

</style>
