<template>
  <div>
    <el-form ref="ruleForm" v-model="item" label-width="85px"  class="demo-ruleForm">
      <el-form-item :label = "$t('form.img')" v-show="item.company === '旅行社介绍'">
        <uploadImg :imgPath="imgPath" @imgPath="getImgUrl"></uploadImg>
        <div class="el-upload__tip">{{$t('form.uptips2')}}</div>
      </el-form-item>
      <el-form-item :label = "$t('form.name')">
        <el-input v-model="item.commodityname"></el-input>
      </el-form-item>
      <el-form-item :label = "$t('form.sequence')" v-if="item.index !== ''">
        <el-select v-model="item.index" @change="setValue">
          <el-option v-for="a of list.length+1" :label=a :value=a :key="a"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label = "$t('form.introduce')" style="margin-bottom: 100px">
        <quillEditor v-model="item.content"
                     ref="newEditor"
                     :options="editorOption"
                     @focus="onEditorFocus($event)">
        </quillEditor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" >{{$t('el.datepicker.confirm')}}</el-button>
        <el-button @click="OnCancel">{{$t('el.datepicker.cancel')}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import 'quill/dist/quill.snow.css'
  import  {Quill,quillEditor} from 'vue-quill-editor'
  import {container, ImageExtend, QuillWatch} from 'quill-image-extend-module'
  Quill.register('modules/ImageExtend', ImageExtend)
  import uploadImg from '../uploadImg.vue'
  export default {
    name: "connectController",
    props:['item','list'],//list为全部导航栏的数据
    components:{
      quillEditor,
      uploadImg
    },
    data(){
      return{
        url:{
          add: this.GLOBAL.addcommodity,
          update: this.GLOBAL.updatecommodity
        },
        imgPath:'/commodity/',
        sort:[],
        editorOption:{
          modules:{
            toolbar: {  // 如果不上传图片到服务器，此处不必配置
              container: container,  // container为工具栏，此次引入了全部工具栏，也可自行配置
              handlers: {
                'image': this.quillUpload  // 劫持原来的图片点击按钮事件
              }
            }
          }
        },
      }
    },
    methods:{
      quillUpload(){
        let input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon');
        input.click();
        let blob
        let img
        input.onchange = () => {
          let file = input.files[0];
          if (/^image\//.test(file.type)) {
            let fr = new FileReader()
            fr.readAsDataURL(file)
            fr.onload = e => {
              img = e.target.result
              // console.log(img)
              input.value = null
            }
            fr.onloadend = e =>{
              let imgName = file.name
              if (img !== ''){
                // console.log(img)
                let binary = atob(img.split(',')[1]);
                let array = [];
                for(let i = 0; i < binary.length; i++) {
                  array.push(binary.charCodeAt(i));
                }
                blob =  new Blob([new Uint8Array(array)], {type:'image/jpeg' });
              }else {
                this.$message({
                  type: 'warning',
                  message: '请添加图片'
                });
              }
              let formData = new FormData();
              formData.append("file", blob ,"file_"+Date.parse(new Date())+".jpeg");
              formData.append("data",this.imgPath + imgName);
              this.axios({
                method:'POST',
                url: this.GLOBAL.img,
                async:false,
                data:formData
              })
                .then(response => {
                  this.$message({
                    type: 'success',
                    message: this.$t('notice.success')
                  });
                  let range = this.$refs.newEditor.quill.getSelection()
                  this.$refs.newEditor.quill.insertEmbed(range.index, 'image', this.GLOBAL.img+this.imgPath+imgName)
                  // console.log("http://47.106.198.169:8080/img"+path + this.imgName)
                }).catch(function (error) {

              })
            }
          } else {
            this.$message(this.$t('notice.checkimg1'));
          }
        };
      },
      getImgUrl(value){
        this.item.imgadres = value
        // console.log(this.item.imgadres)
      },
      setValue(value){
        // console.log(value)
        this.$forceUpdate();
      },
      //提交信息
      onSubmit() {
        let url
        let data = this.item
        if (data.id) {
          url = this.url.update
          this.item['name'] = this.item.commodityname
          console.log(data)
        }else {
          url = this.url.add
          this.item['name'] = this.item.commodityname
          data.index = this.list.length+1
          delete this.item['commodityname']
          console.log(data)
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
            this.$message({
              type: response.data.code === '000'?'success':'error',
              message: response.data.msg
            });
            this.cancel()
          }).catch(function (error) {
            console.log(error);
          })
      },
      //点击编辑框
      onEditorFocus(editor) {
        console.log(this.item.content)
        console.log('editor focus!', editor)
      },
      OnCancel(){
        this.$confirm(this.$t('notice.canceltips'), this.$t('notice.notice'),{
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
      cancel(){
        let show = false;
        this.$emit("cancel",show)
      },
    }
  }
</script>

<style lang="sass" scoped>
  .quill-editor
    height: 300px
    .ql-toolbar
      line-height: 1px

</style>
