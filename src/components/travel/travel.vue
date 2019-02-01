<template>
  <div>
    <!--中国旅游-->
    <div class="fh5co-section-gray">
      <div class="container">
        <div class="row">
          <div class="col-md-8 col-md-offset-2 text-center heading-section animate-box">
            <h3>中国旅游</h3>
            <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
          </div>
        </div>
        <div class="row">
          <!--卡片-->
          <card></card>
        </div>
      </div>
    </div>
    <!--美国旅游-->
    <div>
      <div class="container" style="padding: 112px 0;">
        <div class="row">
          <div class="col-md-8 col-md-offset-2 text-center heading-section animate-box">
            <h3>美国旅游</h3>
            <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
          </div>
        </div>
        <div class="row">
          <!--卡片-->
          <card></card>
        </div>
      </div>
    </div>
    <!--主题游-->
    <div class="fh5co-section-gray">
      <div class="container">
        <div class="row">
          <div class="col-md-8 col-md-offset-2 text-center heading-section animate-box">
            <h3>主题游</h3>
            <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
          </div>
        </div>
        <div class="row">
          <!--卡片-->
          <card></card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import card from "../children/card";
    export default {
      name: "travel",
      components: {card},
      data(){
        return{
          bgi_cover:[{
            backgroundImage: `url(${require('../../../static/images/cover_bg_1.jpg')})`
          },
          ],
        }
      }
    }
</script>

<style scoped>
  .fh5co-section-gray{
    padding: 112px 0;
  }
</style>
