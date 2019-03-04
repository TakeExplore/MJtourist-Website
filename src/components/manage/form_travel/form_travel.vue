<template>
  <div style="height: 100%;">
    <!--导航栏展示-->
    <div class="columnShow" style="height: 100%" v-show="!show">
      <el-button type="primary" style="width: 100%" plain @click="addContent">{{$t('form.addcontent')}}</el-button>
      <el-table :data="menu" height="95%" style="width: 100%">
        <el-table-column
          prop="name"
          :label = "$t('form.name')">
        </el-table-column>
        <el-table-column
          prop="motherspot"
          :label = "$t('form.square')">
        </el-table-column>
        <el-table-column
          prop="moneystr"
          :label = "$t('form.price')">
        </el-table-column>
        <el-table-column
          prop="timeinterval"
          :label = "$t('form.timeinterval')">
        </el-table-column>
        <el-table-column :label = "$t('form.handle')">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">{{$t('btn.update')}}</el-button>
            <el-button
              size="mini"
              type="primary"
              @click="handleDelete(scope.$index, scope.row)">{{$t('btn.delete')}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--编辑页面展示-->
    <travel-controller @cancel="OnShow" :list="menu" :item="item" v-show="show"></travel-controller>
  </div>
</template>

<script>
  import travelController from './travelController'
  export default {
    name: "form_travel",
    components:{
      'travel-controller':travelController
    },
    data(){
      return{
        show:false,//控制栏目增加修改的组件是否显示
        list:[],//获取到的json
        menu:[],//改造后的json
        item:[],//传到编辑页的导航项
      }
    },
    created() {
      this.getColumn()
    },
    methods:{
      getColumn(){
        let data = {
          "a": 123,
          "b": 123
        }
        return this.axios({
          method:'POST',
          url: this.GLOBAL.getentertainment,
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
            this.list = response.data
            this.getMenu(this.list,this.menu)
            // console.log(this.list);
          }).catch(function (error) {
            console.log(error);
          });
      },
      //整理获取到的数据
      getMenu(json,arr){
        let a = 0;
        for(let i in json){
          a  = json[i]
          arr.push(a);
        }
        console.log(this.menu)
      },
      //筛选tag
      filterTag(value, row) {
        return row.tag === value;
      },
      //编辑操作
      handleEdit(index, row) {
        this.item = row;
        this.show = true;
        console.log(index, row);
      },
      //删除操作
      handleDelete(index, row) {
        this.$confirm(this.$t('notice.delete'), this.$t('notice.notice'), {
          confirmButtonText: this.$t('el.datepicker.confirm'),
          cancelButtonText: this.$t('el.datepicker.cancel'),
          type: 'warning'
        }).then(() => {
          return this.axios({
            method:'POST',
            url: this.GLOBAL.deleteentertainment,
            headers: {
              'Content-Type': 'application/json'
            },
            crossDomain: true,
            data: JSON.stringify({
              "id":row.id
            }),
            xhrFields:{
              withCredentials:true
            },
            async:false
          })
            .then(response => {
              if (response.data.code === '000'){
                this.$message({
                  type: 'success',
                  message: response.data.msg
                });
                this.menu = []
                this.getColumn()
              } else {
                this.$message.error(response.data.msg)
              }
            }).catch(function (error) {
              console.log(error);
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('notice.message')
          });
        });
        console.log(index, row);
      },
      //增加内容
      addContent(){
        //旅游管理的内容，攻略景点多加一个kind字段
        this.item = {
          name:"",
          imgadres:"",
          motherspot:"",
          spendtime:"",
          moneystr:"",
          moneyintroduce:"",
          timeinterval:"",
          level:"",
          index:"",
          hot:false,
          useful:true,
          introduce:"",
          remarks:"",
        };
        this.show = true
      },
      //接收子组件传过来的值 判断是否显示
      OnShow(index){
        this.list = '';
        this.menu = [];
        this.show = index
        this.getColumn()
      }
    }
  }
</script>

<style scoped>

</style>
