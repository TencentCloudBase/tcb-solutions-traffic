<template>
  <section>
    <el-row type="flex" class="flex align-center" style="margin: 50px auto;">
      <el-col :span="6" :offset="8">
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
          <el-button type="primary" @click="wxLogin">点击授权登录</el-button>
        </section>
      </el-col>
    </el-row>
  </section>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
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
  wxLogin() {
    const app = this.$tcb.init({
      env: "dev-7e273e"
    });
    console.log(app);
    this.$tcb
      .auth({
        persistence: "session"
      })
      .weixinAuthProvider({
        appid: "wxf5ccfafd9978d829",
        scope: "snsapi_base"
      })
      .signIn()
      .then(() => {
        // 登录成功

        const db = app.database();
        const collection = db.collection("user");
        db.collection("blogs")
          .get()
          .then((res: any) => {
            console.log(res);
          });
      })
      .catch((err: any) => {
        // 登录失败
      });
  }
}
</script>
