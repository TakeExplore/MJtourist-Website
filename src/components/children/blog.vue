<template>
  <div class="container">
    <div class="row row-bottom-padded-md">
      <div class="col-lg-4 col-md-4 col-sm-6" v-for="(item,index) in content" v-show="selectShow(index)">
        <div @click="getArticle(item)" class="fh5co-blog animate-box">
          <router-link :to="/article/ + item.id"><img class="img-responsive" :src = item.imgadres alt=""></router-link>
          <div class="blog-text">
            <div class="prod-title">
              <h3><a href="#">{{item.name}}</a></h3>
              <span class="posted_by">{{item.timeinterval}}</span>
              <span class="comment"><a href="">21<i class="icon-bubble2"></i></a></span>
              <p>{{item.moneyintroduce}}</p>
              <p><router-link :to="/article/ + item.id">{{$t('more.more')}}</router-link></p>
            </div>
          </div>
        </div>
      </div>
      <div class="clearfix visible-sm-block"></div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "blog",
      props:['content','num'],
      data(){
        return{
        
        }
      },
      created(){
        console.log(this.content)
      },
      methods:{
        selectShow(index){
          if (this.num === 1){
            return true
          } else {
            if (index < 3){
              return true
            }
          }
        },
        getArticle(value){
          localStorage.setItem('article', JSON.stringify(value));
          console.log(value)
        }
      }
    }
</script>

<style scoped>

</style>
