<template>
  <div class="row row-bottom-padded-md">
    <div class="col-md-6 animate-box"  v-for="item in content">
      <div class="car" @click="getArticle(item)">

        <div class="one-4">
          <router-link  :to="/article/ + item.id">
          <h3>{{item.name}}</h3>
          <span class="price">{{item.hoteladdress}}<small>  /具体地址</small></span>
          <span class="price">{{item.telnum}}<small> / 电话号码</small></span>
          <span class="price">{{item.motherspot}}<small> / 所属地区</small></span>
          <span class="price" v-if="item.hot"><small> 热门酒店</small></span>
          </router-link>
        </div>
        <div class="one-1" :style="{backgroundImage: 'url(' + item.imgadres + ')'}">
        </div>

      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "hotelClassify",
      props:['content','num'],
      data(){
          return{
          }
      },
      created(){
          console.log(this.content)
      },
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
