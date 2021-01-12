<template>
  <div class="main-box">
    <el-container>
      <el-aside width="200px">
        <div class="title-wrapper">
          <img src="../../assets/tupian.jpg" alt="">
          <span>CRM管理系统</span>

        </div>

        <!--        default-active默认高亮的内容，取值是index的取值-->

        <el-scrollbar>
          <el-menu
              :default-active="$route.name"
              class="el-menu-vertical-demo"
              style="width: 200px"
              :router=true>

            <el-menu-item index="1">
              <i class="el-icon-menu"></i>
              <span slot="title">系统首页</span>
            </el-menu-item>

            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>商品相关</span>
              </template>
              <el-menu-item index="/brand">
                <i class="el-icon-menu"></i>
                <span slot="title" @click="toBrand">品牌管理</span>
              </el-menu-item>
              <el-menu-item index="/supplier">
                <i class="el-icon-menu"></i>
                <span slot="title" @click="toSupplier">供应商管理</span>
              </el-menu-item>
              <el-menu-item index="/category">
                <i class="el-icon-menu"></i>
                <span slot="title" @click="toCategoty">分类管理</span>
              </el-menu-item>
              <el-menu-item index="/goods">
                <i class="el-icon-menu"></i>
                <span slot="title">商品管理</span>
              </el-menu-item>
            </el-submenu>

            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>赠品相关</span>
              </template>
              <el-menu-item index="3-1">
                <i class="el-icon-menu"></i>
                <span slot="title" @click="toBrand">赠品牌管理</span>
              </el-menu-item>
              <el-menu-item index="3-2">
                <i class="el-icon-menu"></i>
                <span slot="title" @click="toSupplier">赠品管理</span>
              </el-menu-item>
              <el-menu-item index="3-3">
                <i class="el-icon-menu"></i>
                <span slot="title" @click="toCategoty">分类管理</span>
              </el-menu-item>
            </el-submenu>

            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>员工相关</span>
              </template>
              <el-menu-item index="/admin">
                <i class="el-icon-menu"></i>
                <span slot="title">员工管理</span>
              </el-menu-item>
            </el-submenu>


            <el-menu-item index="3">
              <i class="el-icon-tickets"></i>
              <span slot="title">运营商管理</span>
            </el-menu-item>

          </el-menu>

        </el-scrollbar>

      </el-aside>
      <el-container>
        <el-header>CRM系统</el-header>
        <el-main>

          <div class="main-body">
            <el-scrollbar>
            <router-view/>
            </el-scrollbar>
          </div>

        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script src="./index.js">

</script>

<style lang="less" src="./index.less">

</style>
