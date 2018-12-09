<template>
  <div id="nav">
  <header id="fh5co-header-section" class="sticky-banner">
    <div class="container">
      <div class="nav-header">
        <a href="#" class="js-fh5co-nav-toggle fh5co-nav-toggle dark"><i></i></a>
        <h1 id="fh5co-logo"><a href=""><img :src=logo style="width: 15%">美加阳光旅行社</a></h1>
        <!-- START #fh5co-menu-wrap -->
        <nav id="fh5co-menu-wrap" role="navigation">
          <ul class="sf-menu" id="fh5co-primary-menu">
            <li class="active"><a href="">首页</a></li>
            <li>
              <a href="" class="fh5co-sub-ddown">出行需知<i class="el-icon-caret-bottom"></i></a>
              <ul class="fh5co-sub-menu">
                <li><a href="#">注意事项</a></li>
                <li><a href="#">新闻咨询</a></li>
                <li><a href="#">生活日常</a></li>
                <li><a href="#">文化节日</a></li>
                <li><a href="#">气候环境</a></li>
              </ul>
            </li>
            <li>
              <a href="" class="fh5co-sub-ddown">旅游<i class="el-icon-caret-bottom"></i></a>
              <ul class="fh5co-sub-menu">
                <li><a href="#">中国参团</a></li>
                <li><a href="#">美国参团</a></li>
                <li><a href="#">主题游</a></li>
              </ul>
            </li>
            <li><a href="">酒店</a></li>
            <li>
              <a href="" class="fh5co-sub-ddown">攻略景点<i class="el-icon-caret-bottom"></i></a>
              <ul class="fh5co-sub-menu">
                <li><a href="#">游记攻略</a></li>
                <li><a href="#">景点介绍</a></li>
                <li><a href="#">路线介绍</a></li>
                <li><a href="#">购物介绍</a></li>
                <li><a href="#">餐饮介绍</a></li>
              </ul>
            </li>
            <li>
              <a href="" class="fh5co-sub-ddown">联系我们<i class="el-icon-caret-bottom"></i></a>
              <ul class="fh5co-sub-menu">
                <li><a href="#">招聘人才</a></li>
                <li><a href="#">预定</a></li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
  </div>
</template>

<script>
    export default {
      name: "navBar",
      data() {
        return {
          logo: require('../../../static/images/logo.png'),
          activeIndex: '1',
          activeIndex2: '1',
          headerFixed: true
        };
      },
      mounted() {
      },
      methods: {
        handleSelect(key, keyPath) {
          console.log(key, keyPath);
        },

      }
    }
</script>

<style scoped>
  /*@import "../../assets/sass/style.scss";*/
  .el-menu--horizontal>.el-menu-item.is-active{
    border-bottom: none;
    font-weight: 600;
  }
  .el-menu--horizontal>.el-menu-item{
    border-bottom: none;
    font-weight: 600;
    /*height: 80px;*/
    /*line-height: 80px;*/
  }
  .el-menu--horizontal>.el-submenu .el-submenu__title{
    line-height: 80px;
  }
  .el-menu--horizontal>.el-submenu .el-submenu__title{
     line-height: 80px;
   }
  .el-menu.el-menu--horizontal{
    border-bottom: none;
    font-weight: 600;
  }
  #logo{
    height: 90px;
  }
  #logo img{
    width: 7%;
    vertical-align:middle;
  }
  #logo p{
    line-height: 90px;
    height: 90px;
    color: #F78536;
    font-weight: bold;
    font-size: 1.8em;
  }
  #menu{
    height: 90px;
    padding-top: 15px;
    padding-bottom: 15px;
  }
  #menu ul {
    margin: 0 auto;
  }
  #nav{
    padding: 0;
    margin: 0;
    width: 100%;
    z-index: 1000;
    left: 0;
    position: fixed;
  }
</style>
