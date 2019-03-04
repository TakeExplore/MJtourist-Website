<template>
  <div v-if="article">
  <div id="fh5co-tours" >
    <div class="container">
      <div class="row">
        <div class="col-md-12 animate-box">
          <h2 class="heading-title" style="text-align: center" v-if="article.name">{{article.name}}</h2>
          <h2 class="heading-title" style="text-align: center" v-if="article.commodityname">{{article.commodityname}}</h2>
        </div>
        <div class="col-md-12 animate-box" v-if="article.motherspot">
          <h3>{{$t('form.square')}}： {{article.motherspot}}</h3>
        </div>
        <div class="col-md-12 animate-box" v-if="article.spendtime">
          <h3>{{$t('form.time')}}： {{article.spendtime}}</h3>
        </div>
        <div class="col-md-12 animate-box" v-if="article.moneystr" v-show="!article.commodityname">
          <h3>{{$t('form.price')}}： {{article.moneystr}}</h3>
        </div>
        <div class="col-md-12 animate-box" v-if="article.level">
          <h3>{{$t('form.star')}}： {{article.level}}</h3>
        </div>
        <div class="col-md-12 animate-box" v-if="article.telnum">
          <h3>{{$t('form.phone')}}： {{article.telnum}}</h3>
        </div>
        <div class="col-md-12 animate-box" v-if="article.timeinterval">
          <h3>{{$t('form.timeinterval')}}： {{article.timeinterval}}</h3>
        </div>
        <div class="col-md-12 animate-box" v-if="article.content" v-html="article.content">
        </div>
        <div class="col-md-12 animate-box" v-if="article.hotelcontent" v-html="article.hotelcontent">
        </div>
        <div class="col-md-12 animate-box" v-if="article.introduce" v-html="article.introduce">
        </div>
        <div style="text-align: center" v-if="!article.monthercolumn && !article.commodityname">
         <el-button type="primary" style="width: 10%" @click="dialogFormVisible = true">{{$t('more.book')}}</el-button>
        </div>
      </div>
    </div>
  </div>
    <el-dialog :title="$t('form.adres')" :visible.sync="dialogFormVisible">
      <el-form :model="this.form">
        <el-form-item :label="$t('form.num')" label-width="100px">
          <el-select v-model="form.sum" placeholder="请选择数量">
            <el-option v-for="a in 10" :label=a :value=a :key="a"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{$t('el.datepicker.cancel')}}</el-button>
        <el-button type="primary" @click="addShop()">{{$t('el.datepicker.confirm')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
    export default {
      name: "writings",
      data() {
        return {
          article: '',
          code: '',
          dialogFormVisible:false,
          form:{
            measurement:'',
            sum:1,
            name:"",
            money:"",
            imgadres:""
          }
        }
      },
      created() {
        this.getRouterData()
      },
      methods: {
        getRouterData() {
          this.article = JSON.parse(localStorage.getItem('article'));
          console.log(this.article)
        },
        //添加商品到购物车中
        addShop(){
          //判断用户是否登录
          if (sessionStorage.getItem('name')){
            this.form.name = this.article.name
            this.form.imgadres = this.article.imgadres
            this.form.money = this.article.money*this.form.sum
            this.dialogFormVisible = false
            if (this.article.hotelcontent) {
              this.form.measurement = '间'
            }else{
              this.form.measurement = '套餐'
            }
            let item = JSON.parse(localStorage.getItem("shopping"))
            let arr = Object.keys(item.commdityinfo)
            let index
            for (let a in item.commdityinfo){
              if (item.commdityinfo[a].name === this.form.name){
                item.commdityinfo[a] = this.form
                index = 1
                console.log(11)
              }
            }
            if (index !== 1){
              item.commdityinfo[arr.length +1] = this.form
              console.log(22)
            }
            localStorage.setItem("shopping",JSON.stringify(item))
            this.$notify({
              title: this.$t('el.datepicker.confirm'),
              message: this.$t('notice.addsuccess')
            });
            console.log(item)
          } else {
            this.$notify.error({
              title: this.$t('error'),
              message: this.$t('user.tips')
            });
          }

        }
      }
    }
</script>

<style lang="sass" scoped>
  .h3
    float: left
  .p
    float: left
</style>
