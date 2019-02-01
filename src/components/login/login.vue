<template>
  <div class="login">
    <div class="head">
      <p><img :src=logo>美加阳光旅行社</p>
    </div>
    <div class="card">
      <el-tabs class="box-card"  type="border-card" v-model="activeName">
        <el-tab-pane label="登录" name="first">
          <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="70px" class="demo-ruleForm">
            <el-form-item label="账号" prop="user">
              <el-input type="user" v-model="ruleForm2.user" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
              <el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item style="width: 74%">
              <el-button type="primary" @click="submitForm('ruleForm2')" style="width: 86%">登录</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="注册" name="second">
          <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="70px" class="demo-ruleForm">
            <el-form-item label="账号" prop="user">
              <el-input type="user" v-model="ruleForm2.user" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
              <el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
              <el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off" ></el-input>
            </el-form-item>
            <el-form-item style="width: 74%">
              <el-button type="primary" @click="submitForm('ruleForm2')" style="width: 86%">注册</el-button>
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
  export default {
    name: "login",
    data(){
      let checkUser = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入账号'));
        } else {
          if (this.ruleForm2.user !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      let validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return{
        logo: require('../../../static/images/logo.png'),
        ruleForm2: {
          pass: '',
          checkPass: '',
          user: ''
        },
        rules2: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          user: [
            { validator: checkUser, trigger: 'blur' }
          ]
        },
        activeName:'first'
      }
    },
    methods:{
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
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
