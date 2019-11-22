<template>
  <div id="app">
    <FirstView>
      <!--<template v-slot:left>-->
        <!--<p>left 我是放入插槽的内容</p>-->
      <!--</template>-->
      <!--<template v-slot:right>-->
        <!--<p>right 我是放入插槽的内容</p>-->
      <!--</template>-->
      <template v-slot:left="{user}">
        <p>{{user.lastName}}</p>
      </template>
      <template v-slot:right="{child}">
        <p>{{child.firstName}}</p>
      </template>
    </FirstView>
  </div>
</template>

<script>

import FirstView from './components/FirstView'
export default {
  name: 'app',
  components: {
    FirstView
  },
  mounted(){
    let arr = [1,2,3,4,5,6,7,8,9,10]
    console.log('xx');
    // console.log(this._chunk2(arr, 3) );
  }
}
</script>

<style>
  input{
    border: 1px solid;
  }

</style>
