<template>
  <div v-if="box">
    <Intro :content="introduce"></Intro>
    <div v-for="item in content">
      <essay :content="item" class="essay"></essay>
    </div>
    <!--<Booking></Booking>-->
  </div>
</template>

<script>
  import Booking from "./booking";
  import Intro from "./intro";
  import essay from "../children/essay"
  export default {
      name: "connect",
      components: {Booking,Intro,essay},
    data(){
      return{
        route:(this.$route.path).split('/')[2],//获取当前所在路由
        list:[],
        contents:[],
        num:'',
        content:[],
        introduce:'',
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
                this.num = this.list.length
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
          url: this.GLOBAL.getcommodity,
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
        for (let b in this.contents){
          if (this.contents[b].company === '旅行社介绍'){
            this.introduce = this.contents[b]
          } else {
            this.content.push(this.contents[b])
          }
        }
        this.box = true
        console.log(this.content)
      }
    }
    }
</script>

<style lang="sass" scoped>
  .essay
    max-height: 300px
    overflow-y: hidden

</style>
