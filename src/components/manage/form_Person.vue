<template>
  <div>
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
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm2')" >修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
    export default {
        name: "form_Person",
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
              return this.axios({
                method:'POST',
                url: "../static/json/user.json",
                headers: {
                  'Content-Type': 'application/json'
                },
                data: this.ruleForm2,
                xhrFields:{
                  withCredentials:true
                },
              })
              .then(response => {
                if (response.data.user.msg === "1"){
                  this.$message({
                    message: '修改成功',
                    type: 'success'
                  });
                } else {
                  this.$message.error("修改失败，稍后再试哦");
                }
              }).catch(function (error) {
                console.log(error);
              })
            } else {
              console.log('糟糕！服务器好像连不上了');
              return false;
            }
          });
        },
        OnCancel() {
          this.$confirm('是否取消当前编辑页面?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.cancel();
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '继续编辑当前页面'
            });
          });
        },
      },
      created(){
        this.ruleForm2.user = window.sessionStorage.getItem("userName");
      }
    }
</script>

<style lang="sass" scoped>
  .el-input
    width: 20%
</style>
