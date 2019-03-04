<template>
  <div class="manage">
    <el-container style="height: 100%">
      <el-header>
        <h4 style="line-height: 60px;color: #F78536"><img :src=logo style="width: 30px;margin-right: 10px">{{$t('title.title')}}</h4>
      </el-header>
      <el-container>
        <el-aside width="200px" class="menu">
          <ma_menu @getIndex="getMain"></ma_menu>
        </el-aside>
        <el-main>
          <!--个人信息-->
          <form_Person v-show="menuIndex === '0'"></form_Person>
          <!--栏目类别管理-->
          <form_column v-show="menuIndex === '1'"></form_column>
          <!--出行须知管理-->
          <form_article v-show="menuIndex === '2'"></form_article>
          <!--旅游管理-->
          <form_travel v-show="menuIndex === '3'"></form_travel>
          <!--酒店管理-->
          <form_hotel v-show="menuIndex === '4'"></form_hotel>
          <!--攻略景点管理-->
          <form_scenery v-show="menuIndex === '5'"></form_scenery>
          <!--联系我们管理-->
          <form_connect v-show="menuIndex === '6'"></form_connect>
          <form_order v-show="menuIndex === '7'"></form_order>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import form_column from './form_colum/form_colum.vue'
  import form_travel from './form_travel/form_travel.vue'
  import form_connect from './form_connect/form_connect.vue'
  import form_scenery from './form_scenery/form_scenery.vue'
  import form_hotel from './form_hotel/form_hotel.vue'
  import form_article from './form_article/form_article.vue'
  import form_Person from './form_Person.vue'
  import form_order from './form_order/form_order.vue'
  import ma_menu from './menu.vue'
  export default {
    name: "manage",
    components:{
      ma_menu,
      form_column,
      form_Person,
      form_travel,
      form_scenery,
      form_hotel,
      form_article,
      form_connect,
      form_order
    },
    data() {
      return {
        logo: require('../../../static/logo.png'),
        menuIndex: '1',
      };
    },
    created(){
      this.checkState()
    },
    methods:{
      getMain(index){
        this.menuIndex = index;
      },
      checkState(){
        if (window.sessionStorage.getItem("name") !== 'admin') {
          this.$router.push('/')
          console.log(1)
        }else {
          this.$router.push('/manage')
        }
      }
    }
  }
</script>

<style scoped>
  .manage{
    width: 100vw;
    height: 100vh;
    min-height: 512px;
    min-width: 512px;
    overflow: hidden;
  }
</style>
