<template>
  <div class="login">
    <div class="head">
      <p><img :src=logo>美加阳光旅行社</p>
    </div>
    <div class="card">
      <el-tabs class="box-card"  type="border-card" v-model="activeName">
        <el-tab-pane label="登录" name="first">
          <el-form  :model="logForm" status-icon :rules="loginRule" ref="logForm" label-width="70px" class="demo-ruleForm">
            <el-form-item label="账号" prop="user">
              <el-input type="user" v-model="logForm.user" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
              <el-input type="password" v-model="logForm.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item style="width: 74%">
              <el-button type="primary" @click="loginForm('logForm')" style="width: 86%">登录</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="注册" name="second">
          <el-form :model="resForm" status-icon :rules="rules" ref="resForm" label-width="70px" class="demo-ruleForm">
            <el-form-item label="账号" prop="user">
              <el-input type="user" v-model="resForm.user" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
              <el-input type="password" v-model="resForm.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
              <el-input type="password" v-model="resForm.checkPass" autocomplete="off" ></el-input>
            </el-form-item>
            <el-form-item style="width: 74%">
              <el-button type="primary" @click="registeredForm('resForm')" style="width: 86%">注册</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <!--<el-card >-->
      <!--</el-card>-->
    </div>
  </div>
</template>

<script>
  import qs from 'qs'
  export default {
    name: "login",
    data(){
      //登录部分
      let checkUser = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入账号'));
        }
        if (value.match(/^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z0-9_-]){1,16}$/) === null){
          callback(new Error('用户名不合法'))
        }
        else {
          if (this.logForm.user !== '') {
            console.log(this.logForm.user)
          }
          callback();
        }
      };
      let checkPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.logForm.checkPass !== '') {
          }
          callback();
        }
      };
      //注册部分
      let checkName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入账号'));
        }
        if (this.resForm.user.match(/^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z0-9_-]){1,16}$/) === null){
          callback(new Error('用户名不合法'))
        }
        else {
          if (this.resForm.user !== '') {
            this.$refs.resForm.validateField('checkPass');
          }
          callback();
        }
      };
      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.resForm.checkPass !== '') {
            this.$refs.resForm.validateField('checkPass');
          }
          callback();
        }
      };
      let validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.resForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return{
        logo: require('../../../static/images/logo.png'),
        logForm: {
          pass: '',
          user: ''
        },
        resForm: {
          pass: '',
          checkPass: '',
          user: ''
        },
        loginRule:{
          pass: [
            { validator: checkPass, trigger: 'blur' }
          ],
          user: [
            { validator: checkUser, trigger: 'blur' }
          ]
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          user: [
            { validator: checkName, trigger: 'blur' }
          ]
        },
        activeName:'first'
      }
    },
    methods:{
      //登录
      loginForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let data = {
              "realname": this.logForm.user,
              "passwd": this.logForm.pass
            };
            console.log(this.logForm.user)
            let url = "http://47.106.198.169:8080/user/login"
            return this.axios({
              method:'POST',
              url: url,
              headers: {
                'Content-Type': 'application/json'
              },
              xhrFields:{
                withCredentials:true
              },
              async:false,
              crossDomain: true,
              data:JSON.stringify(data)
            })
              .then(response => {
                let cookie = response.data.substring(15)
                console.log(response.data.slice(0,4))
                if (response.data.slice(2,4) === "登录成功") {
                  this.$message({
                    message: response.data.slice(0, 4),
                    type: 'success'
                  });
                  this.$router.push('/');
                }else {
                  this.$message({
                    message: response.data,
                    type: 'error'
                  });
                }
                //   if (response.data.user.user === "admin") {
                //     this.$router.push('/manage');
                //   }else {
                //     this.$router.push('/');
                //   }

                sessionStorage.setItem("ticket",cookie);
              }).catch(function (error) {
                console.log(error);
        })
      } else {
        this.$message('请正确填写信息');
  console.log('error submit!!');
  return false;
  }
        });
      },
      //注册
      registeredForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let data = {
              "user": this.resForm.user,
              "password": this.resForm.pass
            };
            let url = "../static/json/user.json"
            let msg = {
              success:"注册成功",
              error:"已存在该用户名"
            }
            this.submitData(url,data,msg);
          } else {
            this.$message('请正确填写信息');
            console.log('error submit!!');
            return false;
          }
        });
      },
      //请求接口函数
      submitData(data,url,msg){
        let a = data;
        let address = url;

      }
    },
    created(){
    }
  }
</script>

<style lang="sass" scoped>
  .login
    width: 100vw
    height: 100vh
    min-height: 512px
    min-width: 512px
    overflow: hidden

  .card
    height: 90%
    display: flex
    justify-content: center
  .box-card
    margin-top: 2%
    width: 25%
    height: 70%
  .head
    height: 10%
    margin-left: 20px
    p
      line-height: 60px
      color: #F78536
      font-size: 25px
      font-weight: bold
    img
      width: 50px
      margin-right: 10px
  .el-tabs__nav
    width: 100%
  .el-tabs--border-card>.el-tabs__header .el-tabs__item
    width: 50%
  .el-form
    display: flex
    flex-direction: column
    align-items: center
    margin-top: 40px
  .el-form-item
    margin-right: 30px

</style>
