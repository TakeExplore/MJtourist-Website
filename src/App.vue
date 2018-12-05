<template>
  <div id="app">
    <div id="navWrapper">
      <v-nav></v-nav>
    </div>
    <router-view/>
  </div>
</template>

<script>
  import navBar from '@/components/navBar/navBar'
  export default {
    name: 'App',
    components:{
      'v-nav':navBar
    }
  }
</script>

<style>
  *{
    margin: 0;
    padding: 0;
    font-size: 13px;
  }
  #navWrapper{
    padding: 0;
    margin: 0;
    width: 100%;
    z-index: 1000;
    left: 0;
    height: 80px;
  }
</style>
