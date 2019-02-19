<template>
  <div id="nav">
  <div id="fh5co-header-section" class="sticky-banner">
    <div class="container">
      <div class="nav-header">
        <!--<a href="#" class="js-fh5co-nav-toggle fh5co-nav-toggle dark"><i></i></a>-->
        <h1 id="fh5co-logo"><a href="/"><img :src=logo style="width: 15%">美加阳光旅行社</a></h1>
        <nav id="fh5co-menu-wrap" role="navigation">
          <ul class="sf-menu" id="fh5co-primary-menu">
            <li v-for="item of list">
              <router-link :to="item.path">{{item.title}}
                <i class="el-icon-caret-bottom" v-show="item.children"></i>
              </router-link>
              <ul v-show="item.children"  class="fh5co-sub-menu">
                <li v-for="nav of item.children">
                  <router-link :to="nav.path">{{nav.title}}</router-link>
                </li>
              </ul>
            </li>
            <li>
              <el-dropdown  @command="handleCommand">
                <span class="el-dropdown-link">
                  <router-link style="font-size: 16px;font-weight: normal" to="/login">{{username}}</router-link>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="退出成功">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
  export default {
    name: "navBar",
    components:{},
    data() {
      return {
        logo: require('../../../static/images/logo.png'),
        activeIndex: '1',
        activeIndex2: '1',
        headerFixed: true,
        list:[],
        username:"登录"
      };
    },
    created() {
      this.getList();
      this.checkState()
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      //服务端获取导航栏数据
      getList() {
        return this.axios.get("./static/json/menu.json")
          .then(response => {
            this.list = response.data;
            console.log(this.list);
          });
      },
      checkState(){
        if (window.sessionStorage.getItem("userName") !== null) {
          this.username = window.sessionStorage.getItem("userName");
        }
      },
      handleCommand(command){
        sessionStorage.removeItem('userName');
        console.log('123')
        if (this.username === '登录'){
          this.$message("您尚未登录");
        } else {
          this.username = '登录'
          this.$forceUpdate();
          this.$message(command);
        }
      }
    }
  }
</script>

<style scoped>
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
