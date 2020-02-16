<template>
  <section>
    <el-row type="flex" class="flex align-center" style="margin: 50px auto;">
      <el-col :span="12" :offset="8">
        <h2 class="logo flex align-center">
          <svg-icon iconClass="logo" class="logo"></svg-icon>
          <span class="ml10">{{ env.VUE_APP_TITLE }}</span>
        </h2>
        <el-divider></el-divider>
        <section class="login">
          <header class="login-header">
            <el-alert
              v-if="error"
              :title="error.title"
              type="warning"
              :description="error.message"
              show-icon
            />
          </header>
          <el-form
            class="login-form"
            auto-complete="off"
            size="medium"
            :model="model"
            :rules="rules"
            ref="login-form"
            label-position="top"
          >
            <el-form-item label="用户名" prop="username">
              <el-input
                type="text"
                v-model="model.username"
                placeholder="请输入用户名"
              />
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input
                type="password"
                v-model="model.password"
                placeholder="请输入密码"
              />
            </el-form-item>
            <el-button type="primary" :loading="loading" @click="submit">
              {{ loading ? "登录中..." : "登录" }}
            </el-button>
          </el-form>
        </section>
      </el-col>
    </el-row>
  </section>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { get, post, put } from "./../utils/http";
import { Form as ElForm } from "element-ui";
import { storageKey } from "./../config/config";
import ENV from "./../config/env";

@Component({})
export default class extends Vue {
  env: any = ENV;
  error: any = null;
  loading: boolean = false;
  model = {
    username: "",
    password: ""
  };
  // form validate rules
  rules = {
    username: [
      { required: true, message: "请输入用户名" },
      {
        min: 2,
        max: 16,
        message: "用户名长度为2到16位"
      }
    ],
    password: [
      { required: true, message: "请输入密码" },
      {
        min: 4,
        max: 16,
        message: "密码长度为4到16位"
      }
    ]
  };
  submit() {
    (this.$refs["login-form"] as ElForm).validate(async (valid: boolean) => {
      if (!valid) {
        return;
      }

      await post("login", this.model).then((res: any) => {
        this.loading = true;
        if (res.status !== 200) {
          return this.$message.error("登录失败");
        }
        this.$message.success("登录成功");
        localStorage.setItem(storageKey, res.data.token);

        const returnUrl: any = this.$route.query.return;
        if (returnUrl) {
          this.$router.push(returnUrl);
        }
        this.$router.push("/dashboard");
      });
    });
  }
}
</script>
