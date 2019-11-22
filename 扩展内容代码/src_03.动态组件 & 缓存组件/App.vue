<template>
  <div id="app">
    <div class="tabs">
      <div class="tabItem" @click="currentTabComponent='FirstView'">FirstView</div>
      <div class="tabItem" @click="currentTabComponent='Profile'">Profile</div>
    </div>
    <div style="width: 100%;height: 50px;"></div>
    <!--缓存组件-->
    <keep-alive>
      <!--动态组件-->
      <component  :is="currentTabComponent"></component>
    </keep-alive>
    <Profile vue-keep-scroll-position/>

  </div>
</template>

<script>

import FirstView from './components/FirstView'
import Profile from './components/Profile'
export default {
  name: 'app',
  components: {
    FirstView,
    Profile
  },
  data(){
    return {
      currentTabComponent: 'FirstView'
    }
  }
}
</script>

<style>
  input{
    border: 1px solid;
  }

  .tabs {
    display: flex;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    background: #fff;
  }

  .tabItem {
    width: 50%;
    height: 50px;
    border: 1px solid;
    text-align: center;
    line-height: 50px;
  }

</style>
