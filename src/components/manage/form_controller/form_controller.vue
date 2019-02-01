<template>
  <div style="height: 100%;">
    <form_common :list="list" @handleEdit="getItem" v-show="show"></form_common>
    <commonController :item="item" @cancel="getShow" v-show="!show"></commonController>
  </div>
</template>

<script>
  import form_common from './form_common.vue'
  import commonController from './commonController.vue'
  export default {
    name: "form_tripKnow",
    components:{
      form_common,
      commonController
    },
    data(){
      return{
        list:[],//服务端获取的数据
        show:true,
        item:''
      }
    },
    created(){
      this.getList();
    },
    methods:{
      //服务端获取数据
      getList() {
        return this.axios.get("./static/json/content.json")
          .then(response => {
            this.list = response.data;
            console.log(this.list);
          });
      },
      getItem(index){
        this.show = false;
        this.item = index
      },
      getShow(index){
        this.show = index
      }
    }
  }
</script>

<style  scoped>

</style>
