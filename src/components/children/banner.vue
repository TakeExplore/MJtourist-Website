<template>
  <div class="fh5co-hero" v-if="box">
    <div class="fh5co-overlay"></div>
    <div class="fh5co-cover" data-stellar-background-ratio="0.5" :style="{backgroundImage: 'url(' + content.imgadres + ')'}">
      <div class="desc">
        <div class="container">
          <div class="row">
            <div class="col-sm-5 col-md-5">
            </div>
            <div class="desc2 animate-box">
              <div class="col-sm-7 col-sm-push-1 col-md-7 col-md-push-1">
                <!--<p>HandCrafted by <a href="http://frehtml5.co/" target="_blank" class="fh5co-site-name">FreeHTML5.co</a></p>-->
                <h3 style="height: 150px;overflow-y: hidden" v-html="content.columnContent"></h3>
                <span class="price" v-html="content.enname"></span>
                <!-- <p><a class="btn btn-primary btn-lg" href="#">Get Started</a></p> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "banner",
      data(){
        return{
          content:'',
          box:false,
          route:this.$route.path.split('/')[2]
        }
      },
      created(){
        this.getList()
      },
      watch:{
        $route() {
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
            url: "http://47.106.198.169:8080/admin/getcolumn",
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
              if (this.$route.path === '/'){
                let arr = []
                arr.push(response.data[1])
                this.content = arr[0]
              } else {
                this.route = this.$route.path.split('/')[2]
                for (let a in response.data){
                  if (response.data[a].id === this.route){
                    this.content = response.data[a]
                  }
                }
              }
              this.box = true
            }).catch(function (error) {
              console.log(error);
            });
        },
      }
    }
</script>

<style scoped>

</style>
