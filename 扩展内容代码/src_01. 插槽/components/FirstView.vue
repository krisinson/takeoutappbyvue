<template>
  <div>
    <h1>FirstView</h1>
    <!--<slot name="left"></slot>-->
    <!--<slot name="right">我是后备内容</slot>-->
    <slot name="left" :user="user">{{user.firstName}}</slot>
    <slot name="right" :child="child">{{user.firstName}}</slot>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        user: {
          firstName: 'kobe',
          lastName: 'bryant'
        },
        child: {
          firstName: 'zhangsan'
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
