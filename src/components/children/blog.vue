<template>
  <div id="fh5co-blog-section" class="fh5co-section-gray">
    <div class="container">
      <div class="row">
        <div class="col-md-8 col-md-offset-2 text-center heading-section animate-box">
          <h3>Our Blog</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit est facilis maiores, perspiciatis accusamus asperiores sint consequuntur debitis.</p>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row row-bottom-padded-md">
        <div class="col-lg-4 col-md-4 col-sm-6" v-for="(item,index) in card" v-show="selectShow(index)">
          <div class="fh5co-blog animate-box">
            <a href="#"><img class="img-responsive" :src=item alt=""></a>
            <div class="blog-text">
              <div class="prod-title">
                <h3><a href="#">30% Discount to Travel</a></h3>
                <span class="posted_by">Sep. 15th</span>
                <span class="comment"><a href="">21<i class="icon-bubble2"></i></a></span>
                <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
                <p><a href="#">Learn More...</a></p>
              </div>
            </div>
          </div>
        </div>
        <div class="clearfix visible-sm-block"></div>
      </div>

    </div>
  </div>
</template>

<script>
    export default {
      name: "blog",
      data(){
        return{
          card:[
            require('../../common/images/place-1.jpg'),
            require('../../common/images/place-2.jpg'),
            require('../../common/images/place-3.jpg'),
            require('../../common/images/place-4.jpg'),
            require('../../common/images/place-5.jpg'),
            require('../../common/images/place-6.jpg')
          ],
        }
      },
      created(){
      },
      methods:{
        selectShow(index){
          if (index < 3){
            return true
          }
        }
      }
    }
</script>

<style scoped>

</style>
