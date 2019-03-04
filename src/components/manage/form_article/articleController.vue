<template>
  <div>
    <el-form ref="ruleForm" v-model="item" label-width="85px"  class="demo-ruleForm">
      <el-form-item :label = "$t('form.name')">
        <el-input v-model="item.name" style="width: 20%"></el-input>
      </el-form-item>
      <!--仅显示出行须知的子栏目-->
      <el-form-item :label = "$t('form.some')">
        <el-select v-model="item.type" @change="setValue">
          <el-option v-for="a in sort" :label=a.cnname :value=a.cnname :key="a.cnname"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('form.sequence')" v-if="item.index !== ''">
        <el-select v-model="item.index" @change="setValue">
          <el-option v-for="a of list.length" :label=a :value=a :key="a"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('form.introduce')" style="margin-bottom: 100px">
        <quillEditor v-model="item.content"
                     ref="newEditor"
                     :options="editorOption"
                     @focus="onEditorFocus($event)">
        </quillEditor>
        <!--<uploadImg :imgPath="imgPath" @imgPath="getImg"></uploadImg>-->
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
  import {container} from 'quill-image-extend-module'
  // Quill.register('modules/ImageExtend', ImageExtend)
  export default {
    name: "articleController",
    props:['item','list'],//list为全部数据
    components:{
      quillEditor,
    },
    data(){
      return{
        url:{
          add: this.GLOBAL.addarticle,
          update: this.GLOBAL.updatearticle
        },
        imgPath:'/article/',
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
        sort:[],
      }
    },
    created(){
      this.getMenu('出行需知',this.sort)
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
                  this.$refs.newEditor.quill.insertEmbed(range.index, 'image', this.GLOBAL.getimg+this.imgPath+imgName)
                  // console.log("http://47.106.198.169:8080/img"+path + this.imgName)
                }).catch(function (error) {

              })
            }
          } else {
            this.$message(this.$t('notice.checkimg1'));
          }
        };
      },
      //分类
      getMenu(value,arr){
        let data = {
          "a": 123,
          "b": 123
        }
        return this.axios({
          method:'POST',
          url: this.GLOBAL.getcolumn,
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
            for (let i in response.data){
              if (response.data[i].cnname === value) {
                for(let a in response.data[i].son){
                  let b = response.data[i].son[a]
                  arr.push(b);
                }
              }
            }
          }).catch(function (error) {
            console.log(error);
          });
      },
      //实时更改信息
      setValue(value){
        console.log(value)
        for (let a of this.sort){
          // console.log(a.cnname)
          if (value === a.cnname){
            this.item.soncolumn = a.id
            console.log(this.item.soncolumn)
          }
        }
        this.$forceUpdate();
      },
      //提交信息
      onSubmit() {
        let url
        let data = this.item
        if (data.id) {
          url = this.url.update
          delete data['type']
          console.log(data)
        }else {
          url = this.url.add
          data.index = this.list.length+1
          delete data['id']
          delete data['type']
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
            console.log(response.data)
            if (response.data.code === '000'){
              this.$message({
                type: 'success',
                message: response.data.msg
              });
            } else {
              this.$message.error(response.data.msg)
            }
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
