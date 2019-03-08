<template>
  <div id="nav">
  <div id="fh5co-header-section" class="sticky-banner">
    <div class="container">
      <div class="nav-header">
        <h1 id="fh5co-logo">
          <a href="/" v-if="language === 'zh'"><img :src=logo style="width: 15%;margin-right: 2%">{{$t('title.title')}}</a>
          <a href="/" v-if="language === 'en'"><img :src=logo style="width: 6%;margin-right: 2%">{{$t('title.title')}}</a>
        </h1>
        <nav id="fh5co-menu-wrap" role="navigation">
          <ul class="sf-menu" id="fh5co-primary-menu">
            <li v-for="item of menu" v-if="language === 'zh'">
              <router-link :to="item.path+'/'+item.id">{{item.cnname}}
                <i class="el-icon-caret-bottom" v-show="item.son.length !== 0"></i>
              </router-link>
              <ul v-show="item.son.length !== 0" class="fh5co-sub-menu">
                <li v-for="nav of item.son">
                  <router-link :to="item.path+'/'+nav.id">{{nav.cnname}}</router-link>
                </li>
              </ul>
            </li>
            <li v-for="item of menu" v-if="language === 'en'">
              <router-link :to="item.path+'/'+item.id">{{item.enname}}
                <i class="el-icon-caret-bottom" v-show="item.son.length !== 0"></i>
              </router-link>
              <ul v-show="item.son.length !== 0" class="fh5co-sub-menu">
                <li v-for="nav of item.son">
                  <router-link :to="item.path+'/'+nav.id">{{nav.enname}}</router-link>
                </li>
              </ul>
            </li>
            <li>
              <el-dropdown  @command="handleCommand">
                <span class="el-dropdown-link">
                  <a style="font-size: 16px;font-weight: normal" @click="isLogin()" v-html="username"></a>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item :command="$t('user.out')">{{$t('user.logout')}}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </li>
            <li>
              <el-dropdown style="margin-top: 13px" @command="changeLocale">
                <span class="el-dropdown-link">
                  {{$t('language.language')}}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="zh">{{$t('language.chinese')}}</el-dropdown-item>
                  <el-dropdown-item command="en">{{$t('language.english')}}</el-dropdown-item>
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
        logo: require('../../../static/logo.jpg'),
        activeIndex: '1',
        activeIndex2: '1',
        headerFixed: true,
        list:[],
        menu:[],
        language:'zh',
        username: this.$t('user.login')
      };
    },
    watch: {
      '$route' (to, from) {
        this.checkState()
      }
    },
    async created() {
      this.getColumn()
      await this.checkState()
    },
    methods: {
      isLogin(){
        if (sessionStorage.getItem('name') !== null){
          this.$router.push('/')
        } else {
          this.$router.push('login')
        }
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      getColumn(){
        let data = {"a": 123}
        return this.axios({
          method:'POST',
          url: "http://47.106.198.169:8080/admin/getcolumn",
          headers: {
            'Content-Type': 'application/json'
          },
          crossDomain: true,
          data: JSON.stringify(data),
          xhrFields:{
            withCredentials:true
          },
          async:false
        })
          .then(response => {
            // this.list = response.data
            this.getMenu(response.data,this.menu)
            // console.log(this.list);
          }).catch(function (error) {
            console.log(error);
          });
      },
      getMenu(json,arr){
        let a = 0;
        for(let i in json){
          if(json[i].cnname !== '主栏目'){
            a  = json[i]
            arr.push(a);
          }
        }
        // console.log(this.menu)
      },
      checkState(){
        if (sessionStorage.getItem("name") !== null) {
          this.username = sessionStorage.getItem("name");
          this.$forceUpdate();
        }else{
          // this.path = '/login'
          this.username = this.$t('user.login')
          localStorage.removeItem('shopping');//清除购物车
          sessionStorage.clear(); //清除用户缓存
        }
      },
      handleCommand(command){
        sessionStorage.removeItem('userName');
        // console.log('123')
        if (this.username === this.$t('user.login')){
          this.$message(this.$t('user.tips'));
        } else {
          this.username = this.$t('user.login')
          this.$forceUpdate();
          // this.path = '/login'
          document.cookie = 'ticket' + '=;  expires=Thu, 01 Jan 1970 00:00:01 GMT;'
          localStorage.removeItem('shopping');//清除购物车
          sessionStorage.clear(); //清除用户缓存
          this.$message(command);
        }
      },
      changeLocale(command){
        this.language = command
        let locale = this.$i18n.locale
        this.$i18n.locale = command
        console.log(command)
      },
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
