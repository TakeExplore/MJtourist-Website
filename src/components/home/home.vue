<template>
  <div>
    <!--板块2-->
      <div id="fh5co-tours" class="fh5co-section-gray">
        <div class="container">
          <div class="row">
            <div class="col-md-8 col-md-offset-2 text-center heading-section animate-box">
              <h3>Hot Tours</h3>
              <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
            </div>
          </div>
          <div class="row">
            <!--卡片-->
            <card></card>
            <!--按钮-->
            <div class="col-md-12 text-center animate-box">
              <p><a class="btn btn-primary btn-outline btn-lg" href="#">See All Offers <i class="el-icon-caret-right"></i></a></p>
            </div>
          </div>
        </div>
      </div>
    <!--板块3-->
      <tips-box />
    <!--板块4-->
      <blog></blog>
    <!--板块5-->
    <div id="fh5co-destination">
      <div class="tour-fluid">
        <div class="row">
          <div class="col-md-12">
            <ul id="fh5co-destination-list" class="animate-box">
              <li class="one-forth text-center" v-for="item in image.destinationOne" :style = item>
                <a href="#">
                  <div class="case-studies-summary">
                    <h2>Los Angeles</h2>
                  </div>
                </a>
              </li>
              <li class="one-half text-center">
                <div class="title-bg">
                  <div class="case-studies-summary">
                    <h2>Most Popular Destinations</h2>
                    <span><a href="#">View All Destinations</a></span>
                  </div>
                </div>
              </li>
              <li class="one-forth text-center" v-for="item in image.destinationTwo" :style = item>
                <a href="#">
                  <div class="case-studies-summary">
                    <h2>Los Angeles</h2>
                  </div>
                </a>
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
          image:{
            bgi_cover:[{
                backgroundImage: `url(${require('../../../static/images/cover_bg_1.jpg')})`
              },
            ],

            destinationOne:[{
                backgroundImage: `url(${require('../../common/images/place-1.jpg')})`
              },
              {
                backgroundImage: `url(${require('../../common/images/place-2.jpg')})`
              },
              {
                backgroundImage: `url(${require('../../common/images/place-3.jpg')})`
              },
              {
                backgroundImage: `url(${require('../../common/images/place-4.jpg')})`
              },
              {
                backgroundImage: `url(${require('../../common/images/place-5.jpg')})`
              }

            ],
            destinationTwo:[{
                backgroundImage: `url(${require('../../common/images/place-6.jpg')})`
              },
              {
                backgroundImage: `url(${require('../../common/images/place-7.jpg')})`
              },
              {
                backgroundImage: `url(${require('../../common/images/place-8.jpg')})`
              },
              {
                backgroundImage: `url(${require('../../common/images/place-9.jpg')})`
              },
              {
                backgroundImage: `url(${require('../../common/images/place-10.jpg')})`
              }

            ],
          }
        }
      },
      created(){
        this.getList();
      },
      methods:{
        getList(){
          let data = {
            "a": 123,
            "b": 123
          }
          $.ajax({
            url: "http://47.106.198.169/admin/getcolumn",
            type: "POST",
            data: JSON.stringify(data),
            xhrFields:{
              withCredentials:true
            },
            headers: {
              "content-type": "application/json;charset=utf-8",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Headers": "X-Requested-With",
              "Access-Control-Allow-Credentials": 'true'
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
              console.log("失败")
            },
            success: function (res) {
              console.log("上传前返回的参数:",res);
            }
          });
        }
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
