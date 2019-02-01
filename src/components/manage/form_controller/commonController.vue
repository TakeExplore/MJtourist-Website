<template>
  <div>
    <el-form ref="form" v-model="item" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="item.title"></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-input v-model="item.type"></el-input>
      </el-form-item>
      <el-form-item label="栏目介绍">
        <el-input type="textarea" v-model="item.desc"></el-input>
      </el-form-item>
      <el-form-item label="介绍"  style="margin-bottom: 150px">
        <quillEditor v-model="content"
                     @blur="onEditorBlur($event)"
                     @focus="onEditorFocus($event)"
                     @ready="onEditorReady($event)"></quillEditor>
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
        editorOption: {
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
        }
      }
    },
    methods: {
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
      onEditorBlur(editor) {
        console.log('editor blur!', editor)
      },
      onEditorFocus(editor) {
        console.log(this.content)
        console.log('editor focus!', editor)
      },
      onEditorReady(editor) {
        console.log('editor ready!', editor)
      }
    }
  }
</script>

<style scoped>
  .quill-editor{
    height: 300px;
  }
  .ql-toolbar{
    line-height: 1px;
  }
</style>
