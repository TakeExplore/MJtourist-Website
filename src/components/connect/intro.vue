<template>
  <div id="fh5co-tours" class="fh5co-section-gray">
    <div class="container">
      <div class="row">
        <div class="col-md-8 col-md-offset-2 text-center heading-section animate-box">
          <h3>{{$t('form.introduce')}}</h3>
        </div>
        <div class="col-md-6 animate-box" v-html="content.content">
          <a href="#">{{$t('more.more')}}<i class="icon-arrow-right22"></i></a>
        </div>
        <div class="col-md-6 animate-box">
          <img class="img-responsive" :src=content.imgadres alt="travel">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "intro",
      props:['content'],
      data(){
        return{
        }
      }
    }
</script>

<style scoped>

</style>
