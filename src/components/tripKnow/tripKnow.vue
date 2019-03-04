<template>
  <div v-if="box">
    <TipsBox v-if="content" :content="content"></TipsBox>
    <!--<essay></essay>-->
  </div>
</template>

<script>
  import TipsBox from "../children/tipsBox";
  import essay from "../children/essay";
  export default {
    name: "tripKnow",
    components: {TipsBox,essay},
    data(){
      return{
        route:(this.$route.path).split('/')[2],//获取当前所在路由
        list:[],
        contents:[],
        content:[],
        box:false
      }
    },
    async created(){
      await this.getContents().then(this.getList)
    },
    watch: {
      $route() {
        this.route = (this.$route.path).split('/')[2]
        this.list = []
        this.content = []
        this.box = false
        this.getList()
      }
    },
    methods:{
      getList(){
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
            // this.columns = response.data
            return this.getSort(response.data)
          }).catch(function (error) {
            console.log(error);
          });
      },
      getNeed(arr){
        for (let a in arr){
          if (arr[a].id === this.route){
            this.list = arr[a].son
          }else {
            for (let b in arr[a].son){
              if (arr[a].son[b].id === this.route){
                this.list.push(arr[a].son[b])
                // console.log(this.list)
              }
            }
          }
        }
      },
      //获取所有文章内容
      getContents(){
        let data = {"a": 123,}
        return this.axios({
          method:'POST',
          url: this.GLOBAL.getarticle,
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
            this.contents = response.data
            // console.log(this.contents)
          }).catch(function (error) {
            console.log(error);
          });
      },
      //筛选相应栏目的内容
      async getSort(arr){
        await this.getNeed(arr)
        if (this.list.length > 1){
          for (let b in this.contents){
            this.content.push(this.contents[b])
          }
        }else {
          console.log(this.list.length)
          for (let a in this.list){
            // console.log(this.list[a])
            for (let b in this.contents){
              if (this.contents[b].soncolumn.cnname === this.list[a].cnname){
                this.content.push(this.contents[b])
              }
            }
          }
        }
        this.box = true
        // console.log(this.content)
      }
    }
  }
</script>

<style scoped>

</style>
