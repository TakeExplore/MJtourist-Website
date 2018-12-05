<template>
<el-row class="nav">
  <el-col :span="4">&nbsp</el-col>
  <el-col :span="8" id="logo" class="center">
    <img :src=logo />
    <p style="height:100%;display:inline-block;vertical-align:middle">美加阳光旅行社</p>
  </el-col>

  <el-col :span="12" id="menu">
      <el-menu :default-active="activeIndex"
               class="el-menu-demo"
               mode="horizontal"
               @select="handleSelect"
               text-color="#666666"
               active-text-color="#F78536">

        <el-menu-item index="1">首页</el-menu-item>
        <el-submenu index="2">
          <template slot="title">出行需知</template>
          <el-menu-item index="2-1">注意事项</el-menu-item>
          <el-menu-item index="2-2">新闻资讯</el-menu-item>
          <el-menu-item index="2-3">生活日常</el-menu-item>
          <el-menu-item index="2-4">文化节日</el-menu-item>
          <el-menu-item index="2-5">气候环境</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">旅游</template>
          <el-menu-item index="3-1">中国参团</el-menu-item>
          <el-menu-item index="3-2">美国参团</el-menu-item>
          <el-menu-item index="3-3">主题游</el-menu-item>
        </el-submenu>
        <el-menu-item index="4">酒店</el-menu-item>
        <el-submenu index="5">
          <template slot="title">攻略景点</template>
          <el-menu-item index="5-1">游记攻略</el-menu-item>
          <el-menu-item index="5-2">景点介绍</el-menu-item>
          <el-menu-item index="5-3">路线介绍</el-menu-item>
          <el-menu-item index="5-4">购物介绍</el-menu-item>
          <el-menu-item index="5-5">餐饮介绍</el-menu-item>
        </el-submenu>
        <el-submenu index="6">
          <template slot="title">联系我们</template>
          <el-menu-item index="6-1">招聘人才</el-menu-item>
          <el-menu-item index="6-2">预定</el-menu-item>
        </el-submenu>
      </el-menu>
  </el-col>
</el-row>
</template>

<script>
    export default {
      name: "navBar",
      data() {
        return {
          logo: require('../../../static/images/logo.png'),
          activeIndex: '1',
          activeIndex2: '1'
        };
      },
      methods: {
        handleSelect(key, keyPath) {
          console.log(key, keyPath);
        }
      }
    }
</script>

<style scoped>
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
    height: 80px;
  }
  #logo img{
    width: 7%;
    vertical-align:middle;
  }
  #logo p{
    line-height: 80px;
    height: 80px;
    color: #F78536;
    font-weight: bold;
    font-size: 1.8em;
  }
  #menu{
    height: 80px;
    padding-top: 10px;
    padding-bottom: 10px;
  }
  #menu ul {
    margin: 0 auto;
  }

</style>
