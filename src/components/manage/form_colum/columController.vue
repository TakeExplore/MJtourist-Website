<template>
  <div>
    <el-form ref="ruleForm" v-model="item" :rules="rules" label-width="85px"  class="demo-ruleForm">
      <el-form-item label="栏目背景图" v-show="item.parent === ''">
        <div class="profile_picture"
             :style="{ backgroundImage: `url(${img})` }">
          <span @click="upLoadClick($event)" class="upload">
            <input style="display: none" accept="image/gif,image/jpeg,image/jpg,image/png" id="up" @change="upLoadImg($event)" type="file" ref="file"/>
          </span>
        </div>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <el-button size="small" type="primary" @click="submitUpload" :disabled="click">点击上传</el-button>
        <div class="el-upload__tip">只能上传jpg/png/jpeg/gif文件，尺寸大小最好为1500*840，且不超过500kb</div>
      </el-form-item>
      <el-form-item label="导航名称" prop="title">
        <el-input v-model="item.title" style="width: 20%"></el-input>
      </el-form-item>
      <el-form-item label="父级菜单" v-show="item.parent !== ''">
        <el-select v-model="item.parent" placeholder="请选择父级菜单" @change="setValue" >
          <el-option v-for="a in list" :label=a.title :value=a.title :key="a.title"></el-option>
        </el-select>
      </el-form-item>
      <!--<el-form-item label="排序">-->
        <!--<el-select v-model="item.sort" @change="setValue" >-->
          <!--<el-option v-for="(a,index) in sort" :label=index :value=index :key="index"></el-option>-->
        <!--</el-select>-->
      <!--</el-form-item>-->
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
        rules:{
          title: [
            { required: true, message: '请输入导航名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
        },
        sort:"",
        img:"",
        click:false
      }
    },
    created(){
      this.checkSort()
    },
    methods:{
      //图片转base64编码
      upLoadImg(e){
        this.beforeUpload(e.target.files[0])
        let that = e.target//保存当前的input元素
        let fr = new FileReader()           //初始化
        fr.readAsDataURL(e.target.files[0]) //选择文件中的头一个开始读取,将img读取为base64编码可以被img直接解析
        fr.onload = e => {                  //在filereader中读取完毕开始异步加载
          this.img = e.target.result
          // console.log(this.img)
          that.value = null               //解决change事件重复选择同一文件是不能重新渲染载入事件
        }
      },
      //base64转blob
      getBlobBydataURI(url,type){
        if (url !== ''){
          let binary = atob(url.split(',')[1]);
          let array = [];
          for(let i = 0; i < binary.length; i++) {
            array.push(binary.charCodeAt(i));
          }
          return new Blob([new Uint8Array(array)], {type:type });
        }else {
          this.$message({
            type: 'warning',
            message: '请添加图片'
          });
        }
      },
      submitUpload(){
        let Blob= this.getBlobBydataURI(this.img,'image/jpeg');//base64 转 blob
        let formData = new FormData();
        formData.append("file", Blob ,"file_"+Date.parse(new Date())+".jpeg");
        formData.append("data","travel/travel.jpg");
        this.axios({
          method:'POST',
          url: "http://47.106.198.169:8080/beimg",
          async:false,
          data:formData
        })
          .then(response => {
            this.$message({
              type: 'success',
              message: '上传成功'
            });
          }).catch(function (error) {
            this.$message({
              type: 'error',
              message: '啊哦！失败了，稍后再试哦'
            });
          })
      },
      //传递上传图片事件
      upLoadClick(e) {
        e.click = this.$refs.file.click()
        // console.log(this.$refs);
      },
      //对上传图片的限制
      beforeUpload(file) {
        console.log(file)
        const checkType = file.type === 'image/jpeg' || file.type === 'image/png'|| file.type === 'image/jpg'|| file.type === 'image/gif';
        const checkSize = file.size / 1024 / 1024 < 0.5; // 限制512KB
        if (!checkType) {
          this.click = true
          this.$message.error('上传图片只支持 JPG/PNG/JPEG/GIF格式');
        }
        if (!checkSize) {
          this.click = true
          this.$message.error('上传图片不能大于 512 KB');
        }
        return checkType && checkSize;

      },
      setValue(value){
        // this.$set(this.item,"parent",value);
        this.$forceUpdate();
      },
      //判断排序
      checkSort(){
        if (this.item.parent === ""){
          this.sort = this.list
          console.log(123);
        } else {
          for(let a of this.list){
            if (a.title === this.item.parent) {
              console.log(1231)
              this.sort = a.children.length
            }
          }
        }
        console.log(this.sort,this.item.parent)
      },
      //提交信息
      onSubmit() {
        return this.axios({
          method:'GET',
          url: url,
          headers: {
            'Content-Type': 'application/json'
          },
          data: this.item,
          xhrFields:{
            withCredentials:true
          },
        })
          .then(response => {
            if (response.data === 1){
              this.$message({
                type: 'success',
                message: '修改成功!'
              });
            } else {
              this.$message.error('修改失败，稍后在试!')
            }
          }).catch(function (error) {
            console.log(error);
          })
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
