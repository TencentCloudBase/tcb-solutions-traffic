<template>
  <section>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card mt20" shadow="never">
      <el-table v-loading="loading" :data="users" stripe size="mini">
        <el-table-column prop="username" label="用户"></el-table-column>
        <el-table-column prop="password" label="密码"></el-table-column>
        <el-table-column prop="_id" width="120" label="操作">
          <template slot-scope="scope">
            <el-popover placement="top" width="160" v-model="visible">
              <p>确定删除吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="visible = false"
                  >取消</el-button
                >
                <el-button
                  type="primary"
                  size="mini"
                  @click="deleteUser(scope.row._id)"
                  >确定</el-button
                >
              </div>
              <el-button
                type="text"
                size="small"
                @click="deleteUser(scope.row._id)"
                slot="reference"
                >删除</el-button
              >
            </el-popover>
            <el-button type="text" @click="gotoEdit(scope.row._id)" size="small"
              >编辑</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class extends Vue {
  visible: boolean = false;
  loading: boolean = true;
  users: any = [];
  deleteUser(id: number) {
    //
  }
  gotoEdit(id: number) {
    this.$router.push(`/post/${id}/edit`);
  }
  loadData() {
    this.loading = false;
  }
  created() {
    this.loadData();
  }
}
</script>
<style lang="scss"></style>
