<template>
  <!--介绍卡片-->
  <div>
  <div class="col-md-4 col-sm-6 fh5co-tours animate-box" data-animate-effect="fadeIn" v-if="content" v-for="(item,index) in content" v-show="selectShow(index)">
    <div @click="getArticle(item)">
      <router-link :to="/article/ + item.id"><img :src = item.imgadres class="img-responsive">
        <div class="desc">
          <span></span>
          <h3>{{item.motherspot}}</h3>
          <span>{{item.spendtime}}</span>
          <span class="price">{{item.money}}</span>
          <router-link class="btn btn-primary btn-outline" :to="/article/ + item.id">{{$t('more.book')}}</router-link>
        </div>
     </router-link>
    </div>
  </div>
  </div>
</template>

<script>
    export default {
      name: "card",
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
