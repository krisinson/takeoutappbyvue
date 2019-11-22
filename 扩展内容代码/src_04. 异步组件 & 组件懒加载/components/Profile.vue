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
    props: ['currentTabComponent'],
    data(){
      return {
        navIndex: 0,
        scrollTop: 0,
        isScroll: true,
      }
    },
    methods: {
      changeNavIndex(index){
        this.navIndex = index
      }
    },
    mounted(){
      console.log('profile mounted');
      window.addEventListener('scroll', () => {
        if(this.isScroll){
          this.scrollTop = document.documentElement.scrollTop
        }
      })
    },
    activated(){
      console.log('-------------activated---------------');
      this.isScroll = true
      document.documentElement.scrollTop = this.scrollTop
    },
    deactivated(){
      console.log('-------------deactivated---------------');
      this.isScroll = false
      // sessionStorage.setItem('scrollTop', this.scrollTop)
    }
  }
</script>

<style>
  .active {
    color: red;
  }
</style>
