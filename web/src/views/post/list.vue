<template>
  <section>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card mt20" shadow="never">
      <el-table v-loading="loading" :data="articles" stripe size="mini">
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="body" label="内容"></el-table-column>
        <el-table-column prop="imageUrl" label="头图">
          <template scope="scope">
            <el-image
              :src="scope.row.imageUrl"
              :preview-src-list="[scope.row.imageUrl]"
              style="max-width: 100px; max-height: 100px;"
            >
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="_id" width="120" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="remove(scope.row)"
              >删除</el-button
            >
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
  articles: any = [];
  remove(row: any) {
    this.$confirm(`是否确定要删除分类 "${row.title}"`, "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    }).then(async () => {
      //
    });
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
