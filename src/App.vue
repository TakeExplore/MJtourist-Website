<template>
  <div id="app">
    <div id="fh5co-wrapper" >
      <div id="fh5co-page">
        <div ref="nav">
          <navBar></navBar>
        </div>
        <div ref="banner" >
          <Banner></Banner>
        </div>
        <router-view></router-view>
        <div ref="order">
          <order></order>
        </div>
        <div ref="footer">
          <Footer></Footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import navBar from '@/components/navBar/navBar'
  import Banner from "@/components/children/banner"
  import Footer from "@/components/children/introduce"
  import manage from "@/components/manage/manage"
  import order from '@/components/order/order'
  export default {
    name: 'App',
    components:{navBar, Banner, Footer,manage,order},
    data(){
      return{
        path:this.$route.path,//获取当前所在路由
        list:'',
      }
    },
    mounted(){
      this.setCss();
    },
    watch: {
      $route() {
        this.path = this.$route.path;
        this.setCss();
      }
    },
    methods:{
      setCss(){
        if (this.path === "/manage"||this.path === "/login" ){
          this.$refs.nav.style.display = 'none';
          this.$refs.order.style.display = 'none';
          this.$refs.banner.style.display = 'none';
          this.$refs.footer.style.display = 'none';
        }else {
          this.$refs.order.style.display = 'block';
          this.$refs.nav.style.display = 'block';
          this.$refs.banner.style.display = 'block';
          this.$refs.footer.style.display = 'block';
        }
      },
    }
  }
</script>

<style lang="sass">

  @import '../src/common/sass/style.scss'
  @import '../src/common/css/animate.css'
  @import '../src/common/css/bootstrap.css'
  @import '../src/common/css/superfish.css'
  @import '../src/common/css/magnific-popup.css'
  @import '../src/common/css/bootstrap-datepicker.min.css'
  @import '../src/common/css/cs-select.css'
  @import '../src/common/css/cs-skin-border.css'
  @import '../src/common/css/style.css'
</style>
