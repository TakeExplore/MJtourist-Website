<template>
  <div class="menu">
    <el-menu class="menu" @select="getIndex">

      <el-menu-item index="0">
        <i class="el-icon-document"></i>
        <span>个人信息</span>
      </el-menu-item>

      <el-menu-item index="1">
        <i class="el-icon-edit-outline"></i>
        <span>栏目类别管理</span>
      </el-menu-item>

      <el-menu-item index="2">
        <i class="el-icon-edit"></i>
        <span>出行需知管理</span>
      </el-menu-item>

      <el-menu-item index="3">
        <i class="el-icon-edit"></i>
        <span>旅游管理</span>
      </el-menu-item>

      <el-menu-item index="4">
        <i class="el-icon-edit"></i>
        <span>酒店管理</span>
      </el-menu-item>

      <el-menu-item index="5">
        <i class="el-icon-edit"></i>
        <span>攻略景点管理</span>
      </el-menu-item>

      <el-menu-item index="6">
        <i class="el-icon-edit"></i>
        <span>联系我们管理</span>
      </el-menu-item>

      <el-menu-item index="99">
        <i class="el-icon-remove-outline"></i>
        <span>退出登录</span>
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
          this.$emit("getIndex",index)
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
