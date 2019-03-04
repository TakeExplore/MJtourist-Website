<template>
  <div class="login">
    <div class="head">
      <p><img :src=logo>{{$t('title.title')}}</p>
    </div>
    <div class="card">
      <el-tabs class="box-card"  type="border-card" v-model="activeName">
        <el-tab-pane :label = "$t('user.login')" name="first">
          <el-form  :model="logForm" status-icon :rules="loginRule" ref="logForm" label-width="70px" class="demo-ruleForm">
            <el-form-item :label = "$t('user.user')" prop="user">
              <el-input type="user" v-model="logForm.user" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item :label = "$t('user.pass')" prop="pass">
              <el-input type="password" v-model="logForm.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item style="width: 74%">
              <el-button type="primary" @click="loginForm('logForm')" style="width: 86%">{{$t('user.login')}}</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane :label = "$t('user.register')" name="second">
          <el-form :model="resForm" status-icon :rules="rules" ref="resForm" label-width="70px" class="demo-ruleForm">
            <el-form-item :label = "$t('user.user')" prop="user">
              <el-input type="user" v-model="resForm.user" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item :label = "$t('form.phone')" prop="phone">
              <el-input type="user" v-model="resForm.phone" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item :label = "$t('user.pass')" prop="pass">
              <el-input type="password" v-model="resForm.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item :label = "$t('user.checkpass')" prop="checkPass">
              <el-input type="password" v-model="resForm.checkPass" autocomplete="off" ></el-input>
            </el-form-item>
            <el-form-item style="width: 74%">
              <el-button type="primary" @click="registeredForm('resForm')" style="width: 86%">{{$t('user.register')}}</el-button>
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
          callback(new Error(this.$t('notice.usernotice')));
        }
        if (value.match(/^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z0-9_-]){1,16}$/) === null){
          callback(new Error(this.$t('notice.user')))
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
          callback(new Error(this.$t('notice.passnotice')));
        } else {
          if (this.logForm.checkPass !== '') {
          }
          callback();
        }
      };
      //注册部分
      let checkName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('notice.usernotice')));
        }
        if (this.resForm.user.match(/^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z0-9_-]){1,16}$/) === null){
          callback(new Error(this.$t('notice.usernotice')))
        }
        else {
          if (this.resForm.user !== '') {
            this.$refs.resForm.validateField('checkPass');
          }
          callback();
        }
      };
      let checkPhone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('notice.phone')));
        }
        if (!(/^(\+?1)?[2-9]\d{2}[2-9](?!11)\d{6}$/.test(this.resForm.phone)) || !(/^1[34578]\d{9}$/.test(this.resForm.phone))){
          callback(new Error(this.$t('notice.phonenotice')))
        }
        else {
          if (this.resForm.phone !== '') {
            this.$refs.resForm.validateField('checkPass');
          }
          callback();
        }
      };
      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('notice.passnotice')));
        } else {
          if (this.resForm.checkPass !== '') {
            this.$refs.resForm.validateField('checkPass');
          }
          callback();
        }
      };
      let validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('notice.passagain')));
        } else if (value !== this.resForm.pass) {
          callback(new Error(this.$t('notice.checkpass')));
        } else {
          callback();
        }
      };
      return{
        logo: require('../../../static/logo.png'),
        logForm: {
          pass: '',
          user: ''
        },
        resForm: {
          pass: '',
          checkPass: '',
          user: '',
          phone:''
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
          phone: [
            { validator: checkPhone, trigger: 'blur' }
          ],
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
            // console.log(url)
            let url = this.GLOBAL.login
            // console.log(url)
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
                console.log(response.data)
                  // this.$router.push('/');
                if (response.data.code === '111'){
                  this.$message({
                    type: 'success',
                    message: response.data.msg
                  });
                  sessionStorage.setItem("name",this.logForm.user);
                  this.$router.push('/manage');
                } else if (response.data.code === '000'){
                  this.$message({
                    type: 'success',
                    message: response.data.msg
                  });
                  sessionStorage.setItem("name",this.logForm.user);
                  localStorage.setItem('shopping', JSON.stringify({
                    getman:this.logForm.user,
                    commdityinfo :{},
                  }));
                  this.$router.push('/')
                } else {
                  this.$message.error(response.data.msg)
                }
                // sessionStorage.setItem("ticket",cookie);
              }).catch(function (error) {
                console.log(error);
                })
            } else {
            this.$message(this.$t('notice.correct'));
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
              "realname":this.resForm.user,
              "telnum":this.resForm.phone,
              "passwd":this.resForm.pass
            };
            let url = this.GLOBAL.register
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
                console.log(response.data)
                if (response.data.code === '000'){
                  this.$message({
                    type: 'success',
                    message: response.data.msg
                  });
                  sessionStorage.setItem("name",this.resForm.user);
                  localStorage.setItem('shopping', JSON.stringify({
                    getman:this.logForm.user,
                    commdityinfo :{},
                  }));
                  this.$router.push('/')
                } else {
                  this.$message.error(response.data.msg)
                }
              }).catch(function (error) {
                console.log(error);
              })
          } else {
            this.$message(this.$t('notice.correct'));
            console.log('error submit!!');
            return false;
          }
        });
      },
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
