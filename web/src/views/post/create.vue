<template>
  <section>
    <el-page-header
      @back="() => this.$router.back()"
      content="详情页面"
    ></el-page-header>
    <el-divider></el-divider>
    <el-form ref="form" :model="model" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="上级">
        <el-select v-model="model.parent">
          <el-option
            v-for="item in cates"
            :key="item._id"
            :label="item.title"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="内容">
        <Editor
          ref="editor"
          v-model="model.body"
          @input="inputContent"
        ></Editor>
      </el-form-item>
      <el-form-item label="缩略图">
        <el-upload
          class="avatar-uploader"
          :action="baseApiUrl + '/upload'"
          :show-file-list="false"
          :on-success="uploadSuccess"
        >
          <img v-if="model.imageUrl" :src="model.imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button
          :loading="loading"
          type="primary"
          @click="onSubmit"
          v-html="btnText"
        ></el-button>
        <el-button @click="() => this.$router.back()">取消</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>
<script lang="ts">
import Vue from "vue";
import { Form as ElForm } from "element-ui";
import Component from "vue-class-component";
import Editor from "./../../components/editorbar.vue";
import { baseApiUrl } from "./../../config/config";

@Component({
  components: { Editor }
})
export default class extends Vue {
  loading: boolean = false;
  isEdit: boolean = false;
  btnText: string = "立即创建";
  model: any = {
    name: "",
    body: "",
    imageUrl: "",
    parent: ""
  };
  baseApiUrl: string = "";
  cates: any = [];

  fetch() {
    //
  }

  fetchCates() {
    //
  }

  uploadSuccess(res: any) {
    this.model.imageUrl = res.url;
  }

  inputContent() {
    //
  }

  onSubmit() {
    (this.$refs["form"] as ElForm).validate((valid: boolean) => {
      if (!valid) {
        return false;
      }
      //
      this.loading = true;
    });
  }

  created() {
    this.fetchCates();
    this.baseApiUrl = baseApiUrl;
    if (this.$route.params.id) {
      this.fetch();
    }
  }
}
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 120px;
  height: 120px;
  display: block;
}
</style>
