<template>
  <div v-if="box">
    <div id="fh5co-car" class="fh5co-section-gray" v-for="(item,index) of this.list">
      <div class="container">
        <div class="row">
          <div class="col-md-8 col-md-offset-2 text-center heading-section animate-box">
            <h3 v-if="locale === 'zh'">{{item.cnname}}</h3>
            <h3 v-if="locale === 'en'">{{item.ennmae}}</h3>
            <p>{{item.columnContent}}</p>
          </div>
        </div>
        <hotelClassify v-if="item.article" :content="item.article" :num="num"></hotelClassify>
      </div>
    </div>
  </div>
</template>

<script>
  import hotelClassify from './hotelClassify'
    export default {
      name: "hotel",
      components:{
        hotelClassify
      },
      data(){
        return{
          route:(this.$route.path).split('/')[2],//获取当前所在路由
          list:[],
          contents:[],
          num:'',
          box:false,
          locale:this.$i18n.locale
        }
      },
      async created(){
        await this.getContents().then(this.getList)
      },
      watch: {
        $route() {
          this.route = (this.$route.path).split('/')[2]
          this.list = []
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
              // console.log(arr[a].son)
              if (arr[a].son.length === 0){
                this.list.push(arr[a])
                this.list[0].value = 'parent'
                // console.log(123)
              } else {
                this.list = arr[a].son
                // console.log(123)
              }
              this.num = this.list.length
              // console.log(this.list)
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
            url: this.GLOBAL.gethotel,
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
          if (this.list[0].value){
            this.list[0].article = []
            for (let b in this.contents){
              this.list[0].article.push(this.contents[b])
              // console.log(this.contents[b])
            }
            console.log()
          } else {
            for (let a in this.list){
              this.list[a].article = []
              // console.log(this.list[a])
              for (let b in this.contents){
                if (this.contents[b].remarks === this.list[a].cnname){
                  this.list[a].article.push(this.contents[b])
                }
              }
            }
          }
          this.box = true
          console.log(this.list)
        }
      }
    }
</script>

<style scoped>

</style>
