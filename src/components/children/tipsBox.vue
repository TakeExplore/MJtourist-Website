<template>
  <div>
    <div id="fh5co-features">
      <div class="container">
        <div class="row">
          <div class="col-md-4 animate-box" v-for="(item,index) in content" style="padding: 20px;">
            <div class="feature-left">
                <span class="icon">
                  <i class="el-icon-star-off"></i>
                </span>
              <div class="feature-copy">
                <h3>{{item.soncolumn.cnname}}</h3>
                <p style="height: 100px;overflow: hidden" v-html="item.name"></p>
                <p @click="getArticle(item)"><router-link  :to="/article/ + item.id">{{$t('more.more')}}</router-link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import writings from './writings'
    export default {
        name: "tipsBox",
      components:{
        writings
      },
      props:['content'],
      methods:{
        getArticle(value){
          localStorage.setItem('article', JSON.stringify(value));
          // console.log(value)
        }
      }
    }
</script>

<style scoped>

</style>
