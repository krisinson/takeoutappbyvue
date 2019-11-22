<template>
  <div>
    <h1>Profile</h1>
    <ul>
      <li @click="changeNavIndex(index)" :class="{active: navIndex === index}" v-for="(item, index) in 100" :key="index">{{item}}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        navIndex: 0,
        scrollTop: 0,
        num: 1
      }
    },
    methods: {
      changeNavIndex(index){
        this.navIndex = index
      }
    },
    // mounted(){
    //   console.log('profile mounted');
    //   console.log('发送请求获取实时数据');
    //
    //   window.addEventListener('scroll', () => {
    //     console.log('scroll');
    //     console.log(document.documentElement.scrollTop);
    //     this.scrollTop = document.documentElement.scrollTop
    //   })
    // },
    // activated(){
    //   console.log('-------------activated---------------');
    //   console.log('发送请求获取实时数据');
    //   document.documentElement.scrollTop = sessionStorage.getItem('scrollTop')?sessionStorage.getItem('scrollTop'):0
    //   setTimeout(() => {
    //     this.num = 123;
    //   }, 1000)
    // },
    // deactivated(){
    //   console.log('-------------deactivated---------------');
    //   console.log(document.documentElement.scrollTop);
    //   sessionStorage.setItem('scrollTop', this.scrollTop)
    // }
  }
</script>

<style>
  .active {
    color: red;
  }
</style>
