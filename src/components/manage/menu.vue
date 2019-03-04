<template>
  <div class="menu">
    <el-menu class="menu" @select="getIndex">

      <el-menu-item index="0">
        <i class="el-icon-document"></i>
        <span>{{$t('manage.person')}}</span>
      </el-menu-item>

      <el-menu-item index="1">
        <i class="el-icon-edit-outline"></i>
        <span>{{$t('manage.columns')}}</span>
      </el-menu-item>

      <el-menu-item index="2">
        <i class="el-icon-edit"></i>
        <span>{{$t('manage.know')}}</span>
      </el-menu-item>

      <el-menu-item index="3">
        <i class="el-icon-edit"></i>
        <span>{{$t('manage.travel')}}</span>
      </el-menu-item>

      <el-menu-item index="4">
        <i class="el-icon-edit"></i>
        <span>{{$t('manage.hotel')}}</span>
      </el-menu-item>

      <el-menu-item index="5">
        <i class="el-icon-edit"></i>
        <span>{{$t('manage.secenery')}}</span>
      </el-menu-item>

      <el-menu-item index="6">
        <i class="el-icon-edit"></i>
        <span>{{$t('manage.connect')}}</span>
      </el-menu-item>

      <el-menu-item index="7">
        <i class="el-icon-edit"></i>
        <span>{{$t('manage.order')}}</span>
      </el-menu-item>

      <el-menu-item index="99">
        <i class="el-icon-remove-outline"></i>
        <span>{{$t('user.logout')}}</span>
      </el-menu-item>

    </el-menu>
  </div>
</template>

<script>
    export default {
      name: "ma_menu",
      methods: {
        getIndex(index){
          // console.log(index);
          if (index === '99'){
            document.cookie = 'ticket' + '=;  expires=Thu, 01 Jan 1970 00:00:01 GMT;'
            sessionStorage.clear(); //清除用户缓存
            this.$message("退出成功");
            this.$router.push('/')
          }else{
            this.$emit("getIndex",index)
          }
        },
        handleOpen(key, keyPath) {
          console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
          console.log(key, keyPath);
        }
      }
    }
</script>

<style scoped>
  .menu{
    height: 100%;
  }
</style>
