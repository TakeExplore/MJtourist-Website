<template>
  <div id="fh5co-tours" class="fh5co-section-gray">
    <div class="container">
      <div class="row">
        <div class="col-md-12 animate-box">
          <h2 class="heading-title">{{content.commodityname}}</h2>
        </div>
        <div class="col-md-12 animate-box" v-html="content.content">

        </div>
        <div @click="getArticle(content)">
          <router-link :to="/article/ + content.id">{{$t('more.more')}}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "essay",
      props:['content'],
      methods:{
        getArticle(value){
          localStorage.setItem('article', JSON.stringify(value));
          console.log(value)
        }
      }
    }
</script>

<style scoped>

</style>
