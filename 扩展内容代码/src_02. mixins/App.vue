<template>
  <div id="app">
    <FirstView>
      <!--<template v-slot:left>-->
        <!--<p>left 我是放入插槽的内容</p>-->
      <!--</template>-->
      <!--<template v-slot:right>-->
        <!--<p>right 我是放入插槽的内容</p>-->
      <!--</template>-->
      <template v-slot:default="{user}">
        <p>{{user.lastName}}</p>

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
  }
}
</script>

<style>
  input{
    border: 1px solid;
  }

</style>
