<template>
  <!--介绍卡片-->
  <div>
  <div class="col-md-4 col-sm-6 fh5co-tours animate-box" data-animate-effect="fadeIn" v-for="item in card">
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
  </div>
</template>

<script>
    export default {
      name: "card",
      data(){
        return{
          card:[
            require('../../common/images/place-1.jpg'),
            require('../../common/images/place-2.jpg'),
            require('../../common/images/place-3.jpg')
          ],
        }
      }
    }
</script>

<style scoped>

</style>
