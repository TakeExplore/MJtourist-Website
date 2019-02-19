<template>
  <div class="columnShow" style="height: 100%">
    <el-button type="primary" style="width: 100%" plain @click="addColumn">增加内容</el-button>
    <el-table :data="list" height="95%" style="width: 100%">
      <el-table-column
        prop="title"
        label="标题">
      </el-table-column>
      <el-table-column
        prop="createDate"
        label="日期">
      </el-table-column>
      <el-table-column
        prop="type"
        label="类别">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="primary"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "form_common",
    props:['list'],
    data(){
      return{
        item:'',//选中的项
      }
    },
    methods:{
      //编辑操作
      handleEdit(index, row) {
        this.item = row;
        this.$emit("handleEdit",this.item);
        console.log(index, row);
      },
      //删除操作
      handleDelete(index, row) {
        this.$confirm('此操作将永久删除该栏目, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
        console.log(index, row);
      },
      //增加文章
      addColumn(){
        this.item = "";
        this.$emit("handleEdit",this.item)
      },
      //接收子组件传过来的值 判断是否显示
      OnShow(index){
        this.show = index
      }
    }

  }
</script>

<style scoped>

</style>
