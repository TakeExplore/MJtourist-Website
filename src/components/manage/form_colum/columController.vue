<template>
  <div>
    <el-form ref="ruleForm" v-model="item" label-width="85px"  class="demo-ruleForm">
      <el-form-item :label = "$t('form.img')" v-show="item.state">
        <uploadImg :imgPath="imgPath" :imgAddress="imgAddress" @imgPath="getImgUrl"></uploadImg>
        <div class="el-upload__tip">{{$t('form.uptips1')}}</div>
      </el-form-item>
      <el-form-item :label = "$t('form.name')">
        <el-input v-model="item.cnname" style="width: 20%"></el-input>
      </el-form-item>
      <el-form-item :label = "$t('form.enname')">
        <el-input v-model="item.enname" style="width: 20%"></el-input>
      </el-form-item>
      <el-form-item :label = "$t('form.parent')" v-show="!item.state">
        <el-select v-model="item.parent" placeholder="请选择父级菜单" @change="setValue" >
          <el-option v-if="a.cnname !== '主栏目'" v-for="a in list" :label=a.cnname :value=a.id :key="a.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label = "$t('form.sequence')" v-if="item.state">
        <el-select v-model="item.sequence" @change="setValue" >
          <el-option v-if="a.cnname !== '主栏目'" v-for="(a,index) in list" :label=index :value=index :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label = "$t('form.sequence')" v-if="!item.state && item.sequence !== ''">
        <el-select v-model="item.sequence" @change="setValue" >
          <el-option v-for="a in item.sort" :label=a :value=a :key="a"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label = "$t('form.introduce')" style="width: 50%">
        <el-input type="textarea" placeholder="内容，建议不超过10字" v-model="item.columnContent" :rows="4"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" >{{$t('el.datepicker.confirm')}}</el-button>
        <el-button @click="OnCancel">{{$t('el.datepicker.cancel')}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import uploadImg from '../uploadImg.vue'
  export default {
    name: "columController",
    props:['item','list'],//list为全部导航栏的数据
    components:{
      uploadImg
    },
    data(){
      return{
        sort:"",
        img:"",
        imgPath:'/column/',
        imgAddress:this.item.imgadres
      }
    },
    created(){
    },
    methods:{
      getImgUrl(value){
        this.item.imgadres = value
        // console.log(this.item.imgadres)
      },
      setValue(value){
        // console.log(value)
        let menu = this.list
        for (let i in menu){
          let a = menu[i]
          if (a.id === value) {
            this.item.motherColumn = value
            this.item.sort = a.son.length
            // console.log(this.item.sort)
          }
        }
        this.$forceUpdate();
      },
      //提交信息
      onSubmit() {
        let url
        let data
        let content = this.item
        if (content.id) {
          url = this.GLOBAL.updatecolumn
          data = {
            "id":content.id,
            "cnname":content.cnname,
            "enname":content.enname,
            "state":content.state,
            "imgadres":content.imgadres,
            "path":content.path,
            "mothercolumn":content.motherColumn,
            "sequence":content.sequence,
            "topnav":true,
            "columncontent":content.columnContent
          }
          // console.log(data)
        }else {
          url = this.GLOBAL.addcolumn
          data = {
            "cnname":this.item.cnname,
            "enname":this.item.enname,
            "state":false,
            "imgadres":content.imgadres,
            "path":content.path,
            "mothercolumn":this.item.motherColumn,
            "sequence":this.item.sort + 1,
            "topnav":true,
            "columncontent":this.item.columnContent
          }
          // console.log(data)
        }
        return this.axios({
          method:'POST',
          url: url,
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
            // console.log(response.data)
            if (response.data.code === '000'){
              this.$message({
                type: 'success',
                message: response.data.msg
              });
            } else {
              this.$message.error(response.data.msg)
            }
            let show = false;
            this.$emit("cancel",show)
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
          let show = false;
          this.$emit("cancel",show)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('notice.until')
          });
        });
      },
    }
  }
</script>

<style lang="sass" scoped>
  .profile_picture
    width: 375px
    height: 200px
    margin: 10px
    background-size: 100% 100%
  .upload
    width: 375px
    height: 200px
    display: block
    cursor: pointer
    border: 1px solid #f0f0f0

</style>
