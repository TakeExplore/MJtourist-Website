<template>
  <div class="fh5co-hero">
    <div class="fh5co-overlay"></div>
    <div class="fh5co-cover" data-stellar-background-ratio="0.5" v-for="item in bgi_cover" :style=item>
      <div class="desc">
        <div class="container">
          <div class="row">
            <div class="col-sm-5 col-md-5">
            </div>
            <div class="desc2 animate-box">
              <div class="col-sm-7 col-sm-push-1 col-md-7 col-md-push-1">
                <!--<p>HandCrafted by <a href="http://frehtml5.co/" target="_blank" class="fh5co-site-name">FreeHTML5.co</a></p>-->
                <h2>Exclusive Limited Time Offer</h2>
                <h3>Fly to Hong Kong via Los Angeles, USA</h3>
                <span class="price">$599</span>
                <!-- <p><a class="btn btn-primary btn-lg" href="#">Get Started</a></p> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "banner",
      data(){
        return{
          bgi_cover:[{
            backgroundImage: `url(${require('../../../static/images/cover_bg_1.jpg')})`
          },
          ],
        }
      },
    }
</script>

<style scoped>

</style>
