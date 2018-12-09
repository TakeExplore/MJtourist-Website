<template>
  <div>
    <banner></banner>
    <!--<div class="block">-->
      <!--<el-carousel trigger="click" height="750px" arrow="never">-->
        <!--<el-carousel-item v-for="item in bgi_cover" :style="item">-->
        <!--</el-carousel-item>-->
      <!--</el-carousel>-->
    <!--</div>-->
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
          <div class="col-md-4 col-sm-6 fh5co-tours animate-box" data-animate-effect="fadeIn" v-for="item in image.card">
            <div href="#"><img :src=item alt="Free HTML5 Website Template by FreeHTML5.co" class="img-responsive">
              <div class="desc">
                <span></span>
                <h3>New York</h3>
                <span>3 nights + Flight 5*Hotel</span>
                <span class="price">$1,000</span>
                <a class="btn btn-primary btn-outline" href="#">Book Now <i class="icon-arrow-right22"></i></a>
              </div>
            </div>
          </div>
          <div class="col-md-12 text-center animate-box">
            <p><a class="btn btn-primary btn-outline btn-lg" href="#">See All Offers <i class="icon-arrow-right22"></i></a></p>
          </div>
        </div>
      </div>
    </div>

    <!--板块3-->
    <div id="fh5co-features">
      <div class="container">
        <div class="row">
          <div class="col-md-4 animate-box" v-for="o in 3">
            <div class="feature-left">
							<span class="icon">
								<i class="icon-hotairballoon"></i>
							</span>
              <div class="feature-copy">
                <h3>Family Travel</h3>
                <p>Facilis ipsum reprehenderit nemo molestias. Aut cum mollitia reprehenderit.</p>
                <p><a href="#">Learn More</a></p>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4 animate-box"  v-for="o in 3">
            <div class="feature-left">
							<span class="icon">
								<i class="icon-wine"></i>
							</span>
              <div class="feature-copy">
                <h3>Business Travel</h3>
                <p>Facilis ipsum reprehenderit nemo molestias. Aut cum mollitia reprehenderit.</p>
                <p><a href="#">Learn More</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import Banner from "../banner/banner";
    export default {
      name: "home",
      components: {Banner},
      component:['banner'],
      data(){
        return{
          image:{
            bgi_cover:[{
                backgroundImage: `url(${require('../../../static/images/cover_bg_1.jpg')})`
              },
            ],
            card:[
              require('../../common/images/place-1.jpg'),
              require('../../common/images/place-2.jpg'),
              require('../../common/images/place-3.jpg')
            ]
          }
        }
      },
    }
</script>

<style scoped>
  /*@import '../../../src/assets/sass/style.scss';*/

  /*@import '../../../src/assets/css/animate.css';*/
  /*@import '../../../src/assets/css/icomoon.css';*/
  /*@import '../../../src/assets/css/bootstrap.css';*/
  /*@import '../../../src/assets/css/superfish.css';*/
  /*@import '../../../src/assets/css/magnific-popup.css';*/
  /*@import '../../../src/assets/css/bootstrap-datepicker.min.css';*/
  /*@import '../../../src/assets/css/cs-select.css';*/
  /*@import '../../../src/assets/css/cs-skin-border.css';*/
  /*@import '../../../src/assets/css/style.css';*/
  /*@import '../../../src/assets/js/modernizr-2.6.2.min.js';*/

  .el-carousel__item:after{
    opacity: 1;
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    background: linear-gradient(45deg,rgba(255, 62, 28, 0.5),rgba(255, 140, 0, 0.5));
  }

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
