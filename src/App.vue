<template>
  <div id="app">
    <div id="fh5co-wrapper" >
      <div id="fh5co-page">
        <div ref="nav">
          <navBar></navBar>
        </div>
        <div ref="banner">
          <Banner></Banner>
        </div>
        <router-view></router-view>
        <div ref="footer">
          <Footer></Footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // import '../src/common/js/jquery.easing.1.3.js'
  // import '../src/common/js/bootstrap.min.js'
  // import '../src/common/js/jquery.waypoints.min.js'
  // import '../src/common/js/sticky.js'
  // import '../src/common/js/jquery.stellar.min.js'
  // import '../src/common/js/hoverIntent.js'
  // import '../src/common/js/superfish.js'
  // import '../src/common/js/jquery.magnific-popup.min.js'
  // import '../src/common/js/magnific-popup-options.js'
  // import '../src/common/js/bootstrap-datepicker.min.js'
  // import '../src/common/js/classie.js'
  // import '../src/common/js/selectFx.js'
  // import '../src/common/js/main.js'

  import navBar from '@/components/navBar/navBar'
  import Banner from "@/components/children/banner"
  import Footer from "@/components/children/introduce"
  import manage from "@/components/manage/manage"
  export default {
    name: 'App',
    components:{navBar, Banner, Footer,manage},
    data(){
      return{
        path:this.$route.path,//获取当前所在路由
      }
    },
    mounted(){
      this.setCss();
    },
    watch: {
      $route() {
        this.path = this.$route.path;
        this.setCss();
        console.log(this.path)
      }
    },
    methods:{
      setCss(){
        if (this.path === "/manage"||this.path === "/login" ){
          this.$refs.nav.style.display = 'none';
          this.$refs.banner.style.display = 'none';
          this.$refs.footer.style.display = 'none';
        }else {
          this.$refs.nav.style.display = 'block';
          this.$refs.banner.style.display = 'block';
          this.$refs.footer.style.display = 'block';
        }
      }
    }
  }
</script>

<style lang="sass">

  @import '../src/common/sass/style.scss'
  @import '../src/common/css/animate.css'
  /*@import '../src/common/css/icomoon.css'*/
  @import '../src/common/css/bootstrap.css'
  @import '../src/common/css/superfish.css'
  @import '../src/common/css/magnific-popup.css'
  @import '../src/common/css/bootstrap-datepicker.min.css'
  @import '../src/common/css/cs-select.css'
  @import '../src/common/css/cs-skin-border.css'
  @import '../src/common/css/style.css'
</style>
