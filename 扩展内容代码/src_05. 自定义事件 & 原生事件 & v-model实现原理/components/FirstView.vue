<template>
  <div>
    <h1>FirstView</h1>
    <button @click="$emit('click', 123)">触发自定义事件</button>
  </div>
</template>

<script>
  export default {
    data(){
      return {

      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
