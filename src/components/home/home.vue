<template>
  <div>
    <div class="block">
      <el-carousel height="750px">
        <el-carousel-item v-for="item in 4" :key="item">
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="tours">
      <el-row>参团</el-row>
      <el-row>skrskrskrskrskrskrskrskrskrskrskrskrskrskr</el-row>
    </div>
  </div>
</template>

<script>
    export default {
        name: "home"
    }
</script>

<style scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .block{
    background:hsla(0,0%,100%,.3);
  }
  .tours{
    height: 750px;
  }
</style>
