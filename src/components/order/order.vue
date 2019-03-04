<template>
    <div>
      <div class="btn">
        <el-tooltip content="购物车" placement="top">
          <el-button icon="el-icon-goods" type="primary" @click="showShop" circle></el-button>
        </el-tooltip>
      </div>
      <el-dialog title="购物车" :visible.sync="dialogTableVisible" v-if="shopContent">
        <el-table :data="shopContent" stripe>
          <el-table-column property="name" :label="$t('form.name')" width="150"></el-table-column>
          <el-table-column property="sum" :label="$t('form.num')" width="200"></el-table-column>
          <el-table-column property="money" :label="$t('form.money')"></el-table-column>
          <el-table-column fixed="right" :label="$t('form.handle')" width="120">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="deleteRow(scope.$index)" type="text" size="small">
                {{$t('btn.delete')}}
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog
          width="30%"
          title="订单信息"
          :visible.sync="innerVisible"
          append-to-body>
          <el-form :model="form" :rules="rules" ref="form">
            <el-form-item :label="$t('form.phone')" prop="phone">
              <el-input v-model="form.getmannum" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item :label="$t('form.adres')">
              <el-input v-model="form.getmanadres" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="innerVisible = false">{{$t('el.datepicker.cancel')}}</el-button>
            <el-button type="primary" @click="addDetail">{{$t('el.datepicker.confirm')}}</el-button>
          </div>
        </el-dialog>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel()">{{$t('el.datepicker.cancel')}}</el-button>
          <el-button type="primary" @click="innerVisible = true">{{$t('el.datepicker.confirm')}}</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "order",
      data(){
        let checkPhone = (rule, value, callback) => {
          if (value === '') {
            callback(new Error(this.$t('notice.phone')));
          }
          if (!(/^(\+?1)?[2-9]\d{2}[2-9](?!11)\d{6}$/.test(this.form.getmannum)) || !(/^1[34578]\d{9}$/.test(this.form.getmannum))){
            callback(new Error(this.$t('notice.phonenotice')))
          }
          else {
            if (this.form.getmannum !== '') {
              this.$refs.form.validateField('checkPass');
            }
            callback();
          }
        };
        return{
          innerVisible: false,
          shopContent:[],
          dialogTableVisible:false,
          json:'',
          form:{
            getmannum:'',
            getmanadres:''
          },
          rules: {
            phone: [
              { validator: checkPhone, trigger: 'blur' }
            ],
          },
        }
      },
      created(){
        // this.getShopping()
      },
      methods:{
        cancel(){
          this.dialogTableVisible = false
        },
        showShop(){
          if (sessionStorage.getItem("name") === 'admin'){
            this.$notify.error({
              title: '错误',
              message: '你是管理员哦'
            });
          }
          else if (sessionStorage.getItem("name")){
            this.dialogTableVisible = true
            this.getShopping()
          } else {
            this.$notify.error({
              title: '错误',
              message: this.$t('user.tips')
            });
          }
        },
        getShopping(){
          this.shopContent = []
          this.json = JSON.parse(localStorage.getItem("shopping"))
          for (let a in this.json.commdityinfo) {
            this.shopContent.push(this.json.commdityinfo[a])
          }
          console.log(this.shopContent)
        },
        deleteRow(index){
          this.shopContent.splice(index,1)
          delete this.json.commdityinfo[index + 1]
          for (let a in this.json.commdityinfo) {
            if (a > index +1){
              this.json.commdityinfo[a-1] = this.json.commdityinfo[a]
              console.log(1)
            }
          }
          console.log(this.json)
          localStorage.setItem("shopping",JSON.stringify(this.json))
          // console.log(index)
        },
        addDetail(){
          //计算总共金额
          // console.log(this.shopContent)
          if (this.shopContent.length === 0){
            this.$message(this.$t('notice.empty'));
          } else {
            let sumMoney = 0
            for (let a of this.shopContent){
              console.log(a)
              sumMoney += a.money
            }
            let data = {
              "name":"商品",
              "moneystr":sumMoney,
              "getman":this.json.getman,
              "getmannum":this.form.getmannum,
              "getmanadres":this.form.getmanadres,
              "commdityinfo":this.json.commdityinfo,
              "sum":this.shopContent.length
            }
            console.log(data)
            return this.axios({
              method:'POST',
              url: this.GLOBAL.addorder,
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
                if (response.data.code === '000'){
                  this.$message({
                    type: 'success',
                    message: '提交订单成功，请等待工作人员回复哦'
                  });
                  this.dialogTableVisible = false
                  this.innerVisible = false
                  localStorage.setItem('shopping', JSON.stringify({
                    getman:this.json.getman,
                    commdityinfo :{},
                  }));
                } else {
                  this.$message.error(response.data.msg)
                }
              }).catch(function (error) {
                console.log(error);
              });
          }

        }

      }
    }
</script>

<style lang="sass" scoped>
  .btn
    position: fixed
    bottom: 20px
    left: 90%
    z-index: 99
</style>
