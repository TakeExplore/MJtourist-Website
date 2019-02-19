<template>
  <div style="height: 100%;">
    <!--导航栏展示-->
    <div class="columnShow" style="height: 100%" v-show="!show">
      <el-button type="primary" style="width: 100%" plain @click="addColumn">增加栏目</el-button>
      <el-table :data="menu" height="95%" style="width: 100%">
        <el-table-column
          prop="title"
          label="名称">
        </el-table-column>
        <el-table-column
          prop="parent"
          label="父级导航名">
        </el-table-column>
        <el-table-column
          prop="path"
          label="路径">
        </el-table-column>
        <el-table-column
          prop="tag"
          label="标签"
          :filters="[{ text: '父级', value: '父级' }, { text: '子级', value: '子级' }]"
          :filter-method="filterTag"
          filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.tag === '父级' ? 'info' : 'success'"
              disable-transitions>{{scope.row.tag}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              v-show="scope.row.parent !== ''"
              size="mini"
              type="primary"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--编辑页面展示-->
    <colum-controller @cancel="OnShow" :list='list' :item="item" v-show="show"></colum-controller>
  </div>
</template>

<script>
  import columController from './columController'
  export default {
    name: "form_colum",
    components:{
      'colum-controller':columController
    },
    data(){
      return{
        show:false,//控制栏目增加修改的组件是否显示
        list:"",//获取到的json
        menu:[],//改造后的json
        item:[],//传到编辑页的导航项
      }
    },
    created() {
      this.getList().then(() => this.getMenu(this.list,this.menu));
    },
    methods:{
      //服务端获取数据
      getList() {
        let token = window.sessionStorage.getItem("token");
        // if (token === null){
        //   this.$router.push('/login')
        //   this.$message.error("请先登录")
        // }
        return this.axios({
          method:'GET',
          url: "./static/json/menu.json",
          headers: {
            'Content-Type': 'application/json'
          },
          xhrFields:{
            withCredentials:true
          },
        })
          .then(response => {
            this.list = response.data;
            console.log(this.list);
          }).catch(function (error) {
            console.log(error);
          });
      },
      //整理获取到的数据
      getMenu(json,arr){
        for (let a of json){
          a['parent'] = "";
          a['tag'] = "父级";
          arr.push(a);
          if (a.children){
            for (let b of a.children){
              b['parent'] = a.title;
              b['tag'] = "子级";
              arr.push(b);
            }
          }
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
        this.$confirm('此操作将永久删除该栏目, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          return this.axios({
            method:'GET',
            url: url,
            headers: {
              'Content-Type': 'application/json'
            },
            data: row,
            xhrFields:{
              withCredentials:true
            },
          })
            .then(response => {
              if (response.data === 1){
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
              } else {
                this.$message.error('删除失败!')
              }
            }).catch(function (error) {
              console.log(error);
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
        console.log(index, row);
      },
      //增加导航栏
      addColumn(){
        this.item = {
          parent:this.list[1].title,
          title:'',
          desc:''
        };
        this.show = true
      },
      //接收子组件传过来的值 判断是否显示
      OnShow(index){
        this.list = '';
        this.menu = [];
        this.getList().then(() => this.getMenu(this.list,this.menu));
        // location.reload();
        this.show = index
      }
    }
  }
</script>

<style scoped>

</style>
