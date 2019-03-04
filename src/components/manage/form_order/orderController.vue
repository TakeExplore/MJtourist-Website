<template>
  <div>
    <el-table :data="content" style="margin-bottom: 30px">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item :label = "$t('form.orderman')">
              <span>{{ props.row.getman }}</span>
            </el-form-item>
            <el-form-item :label = "$t('form.telnum')">
              <span>{{ props.row.getmannum }}</span>
            </el-form-item>
            <el-form-item :label = "$t('form.adres')">
              <span>{{ props.row.getmanadres }}</span>
            </el-form-item>
            <el-form-item :label = "$t('form.money')">
              <span>{{ props.row.money }}</span>
            </el-form-item>
            <el-form-item :label = "$t('form.state')">
              <span>{{ props.row.state }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="getman" :label = "$t('form.orderman')">
      </el-table-column>
      <el-table-column prop="getmannum" :label = "$t('form.telnum')">
      </el-table-column>
      <el-table-column prop="getmanadres" :label = "$t('form.adres')">
      </el-table-column>
      <el-table-column prop="money" :label = "$t('form.money')">
      </el-table-column>
      <el-table-column prop="state" :label = "$t('form.state')">
      </el-table-column>
    </el-table>
    <el-card class="box-card" style="margin-bottom: 30px">
      <div slot="header" class="clearfix">
        <span>具体商品信息</span>
      </div>
      <el-row>
        <el-col :span="4" v-for="(box,index) in item.list" :key="index" style="margin-left: 30px">
          <el-card :body-style="{ padding: '0px' }">
            <img :src=box.imgadres class="image">
            <div style="padding: 14px;">
              <div class="bottom clearfix">
                <p>名称：{{box.name}}</p>
                <p>数量：{{box.sum}}{{box.measurement}}</p>
                <p>总价：{{box.money}}</p>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
    <el-form ref="ruleForm" v-model="item" label-width="85px"  class="demo-ruleForm">
      <el-form-item :label = "$t('form.handleman')">
        <el-input v-model="item.czman"  style="width: 30%"></el-input>
      </el-form-item>
      <el-form-item :label = "$t('form.IP')">
        <el-input v-model="item.ipadres" style="width: 30%" disabled></el-input>
      </el-form-item>
      <el-form-item :label = "$t('form.stateinfo')">
        <el-select v-model="item.stateinfo" @change="setValue" >
          <el-option  label='已审核' value='已审核' key='已审核'></el-option>
          <el-option  label='未审核' value='未审核' key='未审核'></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label = "$t('form.state')">
        <el-select v-model="item.state" @change="setValue" >
          <el-option  label='已付款' value='已付款' key='已付款'></el-option>
          <el-option  label='未付款' value='未付款' key='未付款'></el-option>
          <el-option  label='已发货' value='已发货' key='已发货'></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label = "$t('form.remarks')">
        <el-input v-model="item.remarks"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" >{{$t('el.datepicker.confirm')}}</el-button>
        <el-button @click="OnCancel">{{$t('el.datepicker.cancel')}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "orderController",
    props:['item'],//list为全部导航栏的数据
    data(){
      return{
        url:{
          update: this.GLOBAL.updateorder
        },
        form:{
          id:"",
          stateinfo:"",
          czman:"",
          ipadres:"",
          remarks:"",
          state:""
        },
        content:[]
      }
    },
    created(){
      // this.content = []
      this.content.push(this.item)
    },
    methods:{
      setValue(value){
        // console.log(value)
        this.$forceUpdate();
      },
      //提交信息
      onSubmit() {
        return this.axios({
          method:'POST',
          url: this.url.update,
          headers: {
            'Content-Type': 'application/json'
          },
          crossDomain: true,
          data: JSON.stringify({
            id:this.item.id,
            stateinfo:this.item.stateinfo,
            czman:this.item.czman,
            ipadres:this.item.ipadres,
            remarks:this.item.remarks,
            state:this.item.state
          }),
          xhrFields:{
            withCredentials:true
          },
          async:false
        })
          .then(response => {
            this.$message({
              type: response.data.code === '000'?'success':'error',
              message: response.data.msg
            });
            this.cancel()
          }).catch(function (error) {
            console.log(error);
          })
      },
      OnCancel(){
        this.$confirm(this.$t('notice.canceltips'), this.$t('notice.notice'),{
          confirmButtonText: this.$t('el.datepicker.confirm'),
          cancelButtonText: this.$t('el.datepicker.cancel'),
          type: 'warning'
        }).then(() => {
          this.cancel();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('notice.until')
          });
        });
      },
      cancel(){
        let show = false;
        this.$emit("cancel",show)
      },
    }
  }
</script>

<style scoped>

  .bottom {
    margin-top: 10px;
    line-height: 9px;
  }

  .bottom p {
    font-size: 13px;
    color: #999;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
