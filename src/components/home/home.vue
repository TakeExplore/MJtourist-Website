<template>
  <div>
    <!--板块2-->
      <div id="fh5co-tours" class="fh5co-section-gray" v-if="travel">
        <div class="container">
          <div class="row">
            <div class="col-md-8 col-md-offset-2 text-center heading-section animate-box">
              <h3 v-if="locale === 'zh'">{{introduce.travel.cnname}}</h3>
              <h3 v-if="locale === 'en'">{{introduce.travel.enname}}</h3>
              <p>{{introduce.travel.columnContent}}</p>
            </div>
          </div>
          <div class="row">
            <!--卡片-->
            <div>
              <card :content="travel"></card>
            </div>
            <!--按钮-->
            <div class="col-md-12 text-center animate-box">
              <p><a class="btn btn-primary btn-outline btn-lg" href="#">See All Offers <i class="el-icon-caret-right"></i></a></p>
            </div>
          </div>
        </div>
      </div>
    <!--板块3-->

      <tips-box :content="article"></tips-box>
    <!--板块4-->
    <div id="fh5co-blog-section" class="fh5co-section-gray">
      <div class="container">
        <div class="row">
          <div class="col-md-8 col-md-offset-2 text-center heading-section animate-box">
            <h3 v-if="locale === 'zh'">{{introduce.spot.cnname}}</h3>
            <h3 v-if="locale === 'en'">{{introduce.spot.enname}}</h3>
            <p>{{introduce.spot.columnContent}}</p>
          </div>
        </div>
      </div>
      <blog :content="spot"></blog>
    </div>
    <!--板块5-->
    <div id="fh5co-destination">
      <div class="tour-fluid">
        <div class="row">
          <div class="col-md-12">
            <ul id="fh5co-destination-list" class="animate-box">
              <li class="one-forth text-center" v-for="(item,index) in img" v-show="index < 5" :style = item>
              </li>
              <li class="one-half text-center">
                <div class="title-bg">
                  <div class="case-studies-summary">
                    <h2>Most Popular Destinations</h2>
                    <span><a href="#">View All Destinations</a></span>
                  </div>
                </div>
              </li>
              <li class="one-forth text-center" v-for="(item,index) in img" v-show="index < 5" :style = item>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import TipsBox from "../children/tipsBox";
    import Card from "../children/card";
    import Blog from "../children/blog";
    export default {
      name: "home",
      components: {Card, TipsBox,Blog},
      data(){
        return{
          img:[],
          list:[],
          travel:[],
          article:[],
          spot:[],
          introduce:{
            travel:'',
            spot:''
          },
          locale:this.$i18n.locale
        }
      },
      created(){
        this.getList()
        this.getTips()
        this.getTravel()
        this.getBlog()
      },
      methods:{
        getList(){
          let data = {
            "a": 123,
            "b": 123
          }
          return this.axios({
            method:'POST',
            url: this.GLOBAL.getcolumn,
            headers: {
              'Content-Type': 'application/json'
            },
            crossDomain: true,
            data: JSON.stringify(data),
            xhrFields:{
              withCredentials:true
            },
            async:false
          })
            .then(response => {
              this.list = response.data
              for (let a in this.list){
                if (this.list[a].cnname === '旅游'){
                  this.introduce.travel = this.list[a]
                }
                if (this.list[a].cnname === '攻略景点'){
                  this.introduce.spot = this.list[a]
                }
              }
            }).catch(function (error) {
              console.log(error);
            });
        },
        getTravel(){
          let data = {"a": 123,}
          return this.axios({
            method:'POST',
            url: this.GLOBAL.getentertainment,
            headers: {
              'Content-Type': 'application/json'
            },
            crossDomain: true,
            data: JSON.stringify(data),
            xhrFields:{
              withCredentials:true
            },
            async:false
          })
            .then(response => {
              this.travel = []
              for (let a in response.data){
                this.travel.push(response.data[a])
                this.img.push({
                  backgroundImage: `url(${response.data[a].imgadres})`
                })
              }
              // console.log(this.contents)
            }).catch(function (error) {
              console.log(error);
            });
        },
        getTips(){
          let data = {"a": 123,}
          return this.axios({
            method:'POST',
            url: this.GLOBAL.getarticle,
            headers: {
              'Content-Type': 'application/json'
            },
            crossDomain: true,
            data: JSON.stringify(data),
            xhrFields:{
              withCredentials:true
            },
            async:false
          })
            .then(response => {
              this.article = []
              for (let a in response.data){
                if (a < 7){
                  this.article.push(response.data[a])
                }
              }
            }).catch(function (error) {
              console.log(error);
            });
        },
        getBlog(){
          let data = {"a": 123,}
          return this.axios({
            method:'POST',
            url: this.GLOBAL.getspot,
            headers: {
              'Content-Type': 'application/json'
            },
            crossDomain: true,
            data: JSON.stringify(data),
            xhrFields:{
              withCredentials:true
            },
            async:false
          })
            .then(response => {
              this.spot = []
              for (let a in response.data){
                if (a < 4){
                  this.spot.push(response.data[a])
                  this.img.push({
                    backgroundImage: `url(${response.data[a].imgadres})`
                  })
                }
              }
            }).catch(function (error) {
              console.log(error);
            });
        },
      }
    }
</script>

<style scoped>

  .block{
    background:hsla(0,0%,100%,.3);
  }
  .tours{
    height: 750px;
    width: 100%;
    background-color: rgb(245,245,245);
  }

  .image {
    width: 100%;
    position: relative;
    overflow: hidden;
  }
  .image img{
    width: 100%;
  }
  .image:after{
    opacity: 1;
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.3);
  }

  .card{
    display: flex;
    justify-content: center;
    width: 100%;
  }


</style>
