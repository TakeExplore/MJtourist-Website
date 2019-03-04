<template>
  <div>
    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="70px" class="demo-ruleForm">
      <el-form-item :label="$t('user.user')" prop="user">
        <el-input type="user" v-model="ruleForm2.user" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item :label="$t('user.oldpass')" prop="oldPsw">
        <el-input type="password" v-model="ruleForm2.oldPsw" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item :label="$t('user.newpass')" prop="pass">
        <el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item :label="$t('user.checkpass')" prop="checkPass">
        <el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off" ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm2')" >{{$t('btn.update')}}</el-button>
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
            callback(new Error(this.$t('notice.usernotice')));
          } else {
            if (this.ruleForm2.user !== '') {
              this.$refs.ruleForm2.validateField('checkPass');
            }
            callback();
          }
        };
        let validatePass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error(this.$t('notice.passnotice')));
          } else {
            if (this.ruleForm2.checkPass !== '') {
              this.$refs.ruleForm2.validateField('checkPass');
            }
            callback();
          }
        };
        let validatePass2 = (rule, value, callback) => {
          if (value === '') {
            callback(new Error(this.$t('notice.passagain')));
          } else if (value !== this.ruleForm2.pass) {
            callback(new Error(this.$t('notice.checkpass')));
          } else {
            callback();
          }
        };
        return{
          ruleForm2: {
            pass: '',
            oldPsw:'',
            checkPass: '',
            user: ''
          },
          rules2: {
            oldPsw: [
              { validator: validatePass, trigger: 'blur' }
            ],
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
                url: this.GLOBAL.userupdate,
                headers: {
                  'Content-Type': 'application/json'
                },
                xhrFields:{
                  withCredentials:true
                },
                async:false,
                crossDomain: true,
                data:JSON.stringify({
                  "username":this.ruleForm2.user,
                  "password":this.ruleForm2.oldPsw,
                  "newpassword":this.ruleForm2.pass
                })
              })
              .then(response => {
                this.$message({
                  type: response.data.code === '000'?'success':'error',
                  message: response.data.msg
                });
                document.cookie = 'ticket' + '=;  expires=Thu, 01 Jan 1970 00:00:01 GMT;'
                sessionStorage.clear(); //清除用户缓存
                this.$router.push('/login')
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
          this.$confirm(this.$t('notice.canceltips'), {
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
