<template>
  <div>
    <h1>FirstView</h1>
    <!--<slot name="left"></slot>-->
    <!--<slot name="right">我是后备内容</slot>-->
    <slot :user="user">{{user.firstName}}</slot>
  </div>
</template>

<script>
  import mixin from '../mixins'
  export default {
    // 局部mixins
    mixins: [mixin],
    data(){
      return {
        user: {
          firstName: 'kobe',
          lastName: 'bryant'
        },
        msg: 'xxxx'
      }
    },
    mounted(){
      let arr = [1,2,3,4,5,6,7,8,9,10]
      console.log(this._chunk(arr, 3))
      console.log(this._chunk2(arr, 3))
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
