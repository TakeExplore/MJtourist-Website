<template>
  <div>
    <el-form ref="form" v-model="item" :rules="rules" label-width="85px">
      <el-form-item label="栏目背景图" v-show="item.parent === ''">
        <el-upload
          class="upload-demo"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，尺寸大小最好为1500*840，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="导航名称" prop="title">
        <el-input v-model="item.title" style="width: 20%"></el-input>
      </el-form-item>
      <el-form-item label="父级菜单" v-show="item.parent !== ''">
        <el-select v-model="item.parent" placeholder="请选择父级菜单" @change="setValue" >
          <!--<el-option label="首页" value="首页"></el-option>-->
          <!--<el-option label="出行须知" value="出行须知"></el-option>-->
          <!--<el-option label="旅游" value="旅游"></el-option>-->
          <!--<el-option label="酒店" value="酒店"></el-option>-->
          <!--<el-option label="攻略景点" value="攻略景点"></el-option>-->
          <!--<el-option label="联系我们" value="联系我们"></el-option>-->
          <!--<el-option label="区域二" value="beijing"></el-option>-->
          <el-option v-for="a in list" :label=a.title :value=a.title :key="a.title"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="栏目介绍" style="width: 50%" v-show="item.parent === ''">
        <el-input v-model="item.desc" placeholder="标题，建议不超过15字" style="margin-bottom: 11px"></el-input>
        <el-input type="textarea" placeholder="内容，建议不超过10字" v-model="item.desc" :rows="4"></el-input>
      </el-form-item>
      <el-form-item label="栏目介绍" style="width: 50%" v-show="item.parent !== ''">
        <el-input type="textarea" v-model="item.desc" :rows="4"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" >保存</el-button>
        <el-button @click="OnCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "columController",
    props:['item','list'],
    data(){
      return{
        imageUrl: '',
        formData:this.item,
        rules:{
          title: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
        }
      }
    },
    created(){
    },
    methods:{
      setValue(value){
        // this.$set(this.item,"parent",value);
        this.$forceUpdate();
        console.log(this.item.parent)
      },
      onSubmit() {
        console.log('submit!');
      },
      OnCancel(){
        this.$confirm('是否取消当前编辑页面?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.cancel();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      cancel(){
        let show = false;
        this.$emit("cancel",show)
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    }
  }
</script>

<style scoped>
  .avatar-uploader .el-upload {

    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .el-upload__input{
    display: none;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    border: 1px dashed #d9d9d9;
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
