<template>
  <div>
    <div class="profile_picture"
         :style="{ backgroundImage: `url(${img})` }">
            <span @click="upLoadClick($event)" class="upload">
              <input style="display: none" accept="image/gif,image/jpeg,image/jpg,image/png" id="up" @change="upLoadImg($event)" type="file" ref="file"/>
            </span>
    </div>
    <div class="el-upload__text"><em>{{$t('form.upload')}}</em></div>
    <el-button id="upload" size="small" type="primary" @click="submitUpload" :disabled="click">{{$t('form.upload')}}</el-button>
  </div>
</template>

<script>
  export default {
    name: "uploadImg",
    props:['imgPath','imgAddress'],
    data(){
      return{
        img:this.imgAddress,//当前的图片
        click:true,//控制按钮显示状态
        imgName:''
      }
    },
    watch:{
      'imgAddress' (to, from) {
        this.img = this.imgAddress
      }
    },
    created(){
      console.log(this.imgAddress)
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
          console.log(this.img)
          that.value = null               //解决change事件重复选择同一文件是不能重新渲染载入事件
          // this.submitUpload()
        }
        // this.submitUpload()
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
            message: 'c'
          });
        }
      },
      submitUpload(){
        let path = this.imgPath
        let Blob= this.getBlobBydataURI(this.img,'image/jpeg');//base64 转 blob
        let formData = new FormData();
        formData.append("file", Blob ,"file_"+Date.parse(new Date())+".jpeg");
        formData.append("data",path + this.imgName);
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
            // sessionStorage.setItem('imgurl', "http://47.106.198.169:8080/img"+path + this.imgName)
            this.$emit("imgPath",this.GLOBAL.getimg + path + this.imgName)
            // console.log("http://47.106.198.169:8080/img"+path + this.imgName)

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
        // console.log(file.name)
        this.click = false
        this.imgName = file.name
        const checkType = file.type === 'image/jpeg' || file.type === 'image/png'|| file.type === 'image/jpg'|| file.type === 'image/gif';
        const checkSize = file.size / 1024 / 1024 < 0.5; // 限制512KB
        if (!checkType) {
          this.click = true
          this.$message.error(this.$t('notice.checkimg1'));
        }
        if (!checkSize) {
          this.click = true
          this.$message.error(this.$t('notice.checkimg2'));
        }
        return checkType && checkSize;

      },
    }
  }
</script>

<style lang="sass" scoped>
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
