<template>
  <el-container class="admin-container">
    <el-header>
      <el-row type="flex" justify="space-between" class="flex align-center">
        <el-col :span="12">
          <div class="logo flex align-center white">
            <svg-icon iconClass="logo" class="logo"></svg-icon>
            {{ env.VUE_APP_TITLE }}
          </div>
        </el-col>
        <el-col :span="12">
          <el-row type="flex" justify="end">
            <el-menu
              router
              background-color="#333744"
              text-color="#fff"
              active-text-color="#ffd04b"
              mode="horizontal"
              default-active="2"
            >
              <el-menu-item index="/dashboard">工作台首页</el-menu-item>
              <el-submenu index="2">
                <template slot="title">我的</template>
                <el-menu-item index="/profile">查看资料</el-menu-item>
                <el-menu-item @click="logout" index="2">退出</el-menu-item>
              </el-submenu>
            </el-menu>
          </el-row>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px" style="background-color: #333744;">
        <el-menu
          router
          :default-active="$route.path"
          :default-openeds="['1', '2']"
          background-color="#333744"
          active-text-color="#ffd04b"
          text-color="#fff"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-document"></i>内容管理
            </template>
            <el-menu-item-group>
              <template slot="title">文章管理</template>
              <el-menu-item index="/post/list">文章列表</el-menu-item>
              <el-menu-item index="/post/create">新建文章</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-user"></i>用户管理
            </template>
            <el-menu-item index="/users">用户列表</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main>
          <router-view :key="$route.path"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { get, deleterReq } from "./../utils/http";
import { storageKey } from "./../config/config";
import ENV from "./../config/env";

@Component({})
export default class extends Vue {
  env: any = ENV;
  logout() {
    localStorage.removeItem(storageKey);
    this.$router.push("/login");
  }
}
</script>

<style lang="scss">
.admin-container {
  min-height: 100vh;
  font-family: gilroy-regular, Microsoft YaHei, Myriad Pro, Hiragino Sans GB,
    Lucida Grande, sans-serif;
  .el-header {
    background-color: #333744;
    .logo {
      margin-right: 1rem;
    }
  }
  .el-menu {
    border-right-width: 0;
    .el-menu-item.is-active {
      background-color: #292c36 !important;
    }
  }
}
</style>
