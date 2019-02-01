<template>
  <div class="manage">
    <el-container style="height: 100%">
      <el-header>
        <h4 style="line-height: 60px;color: #F78536"><img :src=logo style="width: 30px;margin-right: 10px">美加阳光旅行社</h4>
      </el-header>
      <el-container>
        <el-aside width="200px" class="menu">
          <ma_menu @getIndex="getMain"></ma_menu>
        </el-aside>
        <el-main>
          <!--个人信息-->
          <form_Person v-show="menuIndex === '0'"></form_Person>
          <!--栏目类别管理-->
          <form_colum v-show="menuIndex === '1'"></form_colum>
          <!--出行须知 旅游管理 酒店管理 攻略景点管理 联系我们管理-->
          <form_controller v-show="menuIndex === '2'||menuIndex === '3'||menuIndex === '4'||menuIndex === '5'||menuIndex === '6'"></form_controller>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import form_colum from './form_colum/form_colum.vue'
  import form_controller from './form_controller/form_controller.vue'
  import form_Person from './form_Person.vue'
  import ma_menu from './menu.vue'
  export default {
    name: "manage",
    components:{
      ma_menu,
      form_colum,
      form_controller,
      form_Person,
    },
    data() {
      return {
        logo: require('../../../static/images/logo.png'),
        menuIndex: '1'
      };
    },
    methods:{
      getMain(index){
        this.menuIndex = index;
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
