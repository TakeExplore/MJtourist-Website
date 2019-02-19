<template>
  <div>
    <el-form ref="form" v-model="item" label-width="80px">
      <el-form-item label="小图">
        <div class="profile_picture"
             :style="{ backgroundImage: `url(${img})` }">
          <span @click="upLoadClick($event)" class="upload">
            <input style="display: none" accept="image/gif,image/jpeg,image/jpg,image/png" id="up" @change="upLoadImg($event)" type="file" ref="file"/>
          </span>
        </div>
        <div class="el-upload__text"><em>点击上传</em></div>
          <el-button size="small" type="primary" @click="submitUpload" :disabled="click">点击上传</el-button>
          <div class="el-upload__tip">点击按钮上方图片添加图片，只能上传jpg/png文件，尺寸大小最好为900*800，且不超过500kb</div>
          <div class="el-upload__tip">点击按钮上方图片添加图片，只能上传jpg/png文件，尺寸大小最好为800*530，且不超过500kb</div>
      </el-form-item>
      <el-form-item label="价格">
        <el-input v-model="item.price"></el-input>
      </el-form-item>
      <el-form-item label="天数">
        <el-input v-model="item.days"></el-input>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="item.title"></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-input v-model="item.type"></el-input>
      </el-form-item>
      <el-form-item label="栏目介绍">
        <el-input type="textarea" v-model="item.desc"></el-input>
      </el-form-item>
      <el-form-item label="排序">
        <el-input v-model="item.sort"></el-input>
      </el-form-item>
      <el-form-item label="介绍"  style="margin-bottom: 150px">
        <quillEditor v-model="content"
                     @focus="onEditorFocus($event)">
        </quillEditor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" >保存</el-button>
        <el-button @click="OnCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import 'quill/dist/quill.snow.css'
  import  {Quill,quillEditor} from 'vue-quill-editor'
  // 上传图片到服务器
  import {container, ImageExtend, QuillWatch} from 'quill-image-extend-module'
  Quill.register('modules/ImageExtend', ImageExtend)
  //改变字体
  // const Font = Quill.import('formats/font')
  // Font.whitelist = ['Arial', '宋体', '黑体', '微软雅黑']
  // Quill.register(Font, true)
  export default {
    name: "commonController",
    components:{
      quillEditor
    },
    props:['item'],
    data() {
      return {
        content:'',
        editorOption: {//文本编辑器上传图片
          modules: {
            ImageExtend: {
              loading: true,
              name: 'img',
              action: 'http://132.232.30.233',
              response: (res) => {
                // console.log(res.info)
                return res.info
              }
            },
            toolbar: {
              container: container,
              handlers: {
                'image': function () {
                  QuillWatch.emit(this.quill.id)
                }
              }
            }
          }
        },
        fileList:[],
        img:"",
        click:false
      }
    },
    methods: {
      //图片转base64编码
      upLoadImg(e){
        this.beforeUpload(e.target)
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
      //上传图片
      submitUpload(){
        let Blob= this.getBlobBydataURI(this.img,'image/jpeg');//base64 转 blob
        let formData = new FormData();
        formData.append("file", Blob ,"file_"+Date.parse(new Date())+".jpeg"); //此参数为上传的图片名称和该图片在哪里,实例如下
        formData.append("data","travel/travel.jpg"); //组建XMLHttpRequest 上传文件
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
      onSubmit() {
        console.log('submit!');
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
      cancel() {
        let show = true;
        this.$emit("cancel", show)
      },
      // onEditorBlur(editor) {
      //   console.log('editor blur!', editor)
      // },
      onEditorFocus(editor) {
        console.log(this.content)
        console.log('editor focus!', editor)
      },
      // onEditorReady(editor) {
      //   console.log('editor ready!', editor)
      // },
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

    }
  }
</script>

<style lang="sass" scoped>
  .quill-editor
    height: 300px
  .ql-toolbar
    line-height: 1px
  .profile_picture
    width: 225px
    height: 200px
    margin: 10px
    background-size: 100% 100%
  .upload
    width: 225px
    height: 200px
    display: block
    cursor: pointer
    border: 1px solid #f0f0f0
</style>
