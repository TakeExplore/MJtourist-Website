<template>
  <div style="height: 100%;">
    <!--导航栏展示-->
    <div class="columnShow" style="height: 100%" v-show="!show">
      <el-button type="primary" style="width: 100%" plain @click="addColumn">{{$t('form.addcolumn')}}</el-button>
      <el-table :data="menu" height="95%" style="width: 100%" stripe>
        <el-table-column
          prop="cnname"
          :label = "$t('form.name')">
        </el-table-column>
        <el-table-column
          prop="parent"
          :label = "$t('form.parent')">
        </el-table-column>
        <el-table-column
          prop="sequence"
          :label = "$t('form.sequence')">
        </el-table-column>
        <el-table-column
          prop="tag"
          :label = "$t('form.tag')"
          :filters="[{ text: '父级', value: '父级' }, { text: '子级', value: '子级' }]"
          :filter-method="filterTag"
          filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.tag === '父级' ? 'info' : 'success'"
              disable-transitions>{{scope.row.tag}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column :label = "$t('form.handle')">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">{{$t('btn.update')}}</el-button>
            <el-button
              v-show="scope.row.parent !== ''"
              size="mini"
              type="primary"
              @click="handleDelete(scope.$index, scope.row)">{{$t('btn.delete')}}</el-button>
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
            this.list = response.data
            this.getMenu(this.list,this.menu)
            console.log(this.list);
          }).catch(function (error) {
            console.log(error);
          });
      },
      //整理获取到的数据
      getMenu(json,arr){
        let a = 0;
        for(let i in json){
          if(json[i].cnname !== '主栏目'){
            a  = json[i]
            a['parent'] = "";
            a['tag'] = "父级";
            arr.push(a);
            if (a.son){
              for (let b of a.son){
                b['parent'] = a.cnname;
                b['tag'] = "子级";
                b['sort'] = a.son.length;
                arr.push(b);
              }
            }
          }
        }
        // console.log(this.menu)
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
            url: this.GLOBAL.deletecolumn,
            headers: {
              'Content-Type': 'application/json'
            },
            crossDomain: true,
            data: JSON.stringify({
              "id":row.id,
              "state":row.state,
              "mothercolumn":row.motherColumn
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
              } else {
                this.$message.error(response.data.msg)
              }
              this.menu = []
              this.getColumn()
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
      //增加导航栏
      addColumn(){
        this.item = {
          cnname: "",
          columnContent: "",
          imgadres:"",
          path:"/www",
          enname: "",
          motherColumn: "",
          parent: "",
          sequence: "",
          son: [],
          sort: "",
          state: false,
          topnav: true
        };
        this.show = true
      },
      //接收子组件传过来的值 判断是否显示
      OnShow(index){
        this.list = '';
        this.menu = [];
        this.show = index
        this.getColumn()
        // location.reload();
      }
    }
  }
</script>

<style scoped>

</style>
