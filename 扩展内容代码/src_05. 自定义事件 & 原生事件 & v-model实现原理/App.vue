<template>
  <div id="app">
    <!--
      v-model干了哪些事情：
        1. 将变量赋值给对应表单项的value
        2. 绑定input事件，在input事件触发的同时将表单项的数据同步更新至data中的变量中
    -->
    <input type="text" v-model="msg">
    <p>{{msg}}</p>
    <br>
    <hr>
    <input type="text" :value="msg2" @input="msg2 = $event.target.value">
    <p>{{msg2}}</p>
    <br>
    <hr>
    <!-- 原生click事件-->
    <button @click="test1($event)">按钮1</button>
    <!--自定义click事件-->
    <FirstView @click="test2"/>

    <!-- v-model 作用在组件标签身上 -->
    <br>
    <hr>
    <VModel v-model="msg3"/>
    <!--<VModel :value="msg3" @input="msg3 = value"/>-->
    <p>{{msg3}}</p>
  </div>
</template>

<script>

import FirstView from './components/FirstView'
import VModel from './components/VModel'
export default {
  name: 'app',
  components: {
    FirstView,
    VModel
  },
  data(){
    return {
      msg: 'kobe',
      msg2: 'wade',
      msg3: 'curry'
    }
  },
  methods: {
    test1(event){
      alert('test1')
      console.log(event);
    },
    test2(msg){
      alert('test2')
      console.log(msg);
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
    width: 33.333333%;
    height: 50px;
    border: 1px solid;
    text-align: center;
    line-height: 50px;
  }

</style>
