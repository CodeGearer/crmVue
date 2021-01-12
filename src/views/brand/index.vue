<template>
  <div class="entity-box">
    <!--  操作的部分-->
    <div class="execute-box">
      <el-button-group>
        <el-button type="primary" @click="editDialog = true,formData={}">新建</el-button>
        <el-button type="danger" @click="delDialog = true">删除<i></i></el-button>
      </el-button-group>
<!--      <el-button type="primary" plain>新建</el-button>-->
<!--      <el-button type="danger" plain >删除</el-button>-->

    </div>
    <!--    搜索查询-->
    <div class="search-box">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="请输入要查询的内容">
          <el-input v-model="formInline.name" placeholder="请输入要查询的内容"></el-input>
          <el-button type="primary" @click="onSubmit" class="chaxun">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--    数据表格
          stripe:表示隔行变色
          border:设置边框的

    -->
    <div class="table-box">

      <el-table
          :data="tableData"
          stripe
          border
          @selection-change="selectionChangeListener"
          style="width: 100%">
        <!--        选择框-->
        <el-table-column
            type="selection"
            width="55"
            align="center"/>

        <el-table-column
            prop="id"
            label="id"
            align="center"
        />
        <el-table-column
            prop="brandName"
            label="品牌名称"
            align="center"
        />
        <el-table-column
            prop="brandSite"
            label="品牌网站"
            align="center"
        />
        <el-table-column
            prop="brandDesc"
            label="品牌描述"
            align="center"
        />
        <el-table-column
            prop="brandLogo"
            label="品牌logo"
            align="center"
        />
        <el-table-column
            prop="addTime"
            label="添加时间"
            align="center"
        />
        <el-table-column
            prop="creatorId"
            label="添加人id"
            align="center"
        />

        <el-table-column
            prop="updateTime"
            label="修改时间"
            align="center"
        />
        <el-table-column
            prop="updateId"
            label="修改人id"
            align="center"
        />
        <el-table-column
            fixed="right"
            label="操作"
            align="center"
        >
          <!--          必须将按钮添加到template中，为了取值-->
          <template slot-scope="obj">
            <el-button type="text" size="small" @click="delDialog=true,$refs.dataTable.clearSelection(),ids=[],ids.push(obj.row.id)">删除</el-button>
            <el-button @click="findById(obj.row.id), editDialog=true" type="text" size="small">编辑</el-button>
            <el-button @click="drawer = true" type="text" size="small">
              详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-drawer
          title="品牌详情"
          :visible.sync="drawer"
          :direction="direction"
          :before-close="handleClose">

        <el-table
            :data="tableData"
            stripe
            border
            @selection-change="selectionChangeListener"
            style="width: 100%">

        <el-table-column
            prop="brandName"
            label="品牌名称"
            align="center"
        />
        <el-table-column
            prop="brandSite"
            label="品牌网站"
            align="center"
        />
        <el-table-column
            prop="brandDesc"
            label="品牌描述"
            align="center"
        />
        <el-table-column
            prop="brandLogo"
            label="品牌logo"
            align="center"
        />
        <el-table-column
            prop="addTime"
            label="添加时间"
            align="center"
        />
        <el-table-column
            prop="creatorId"
            label="添加人id"
            align="center"
        />

        <el-table-column
            prop="updateTime"
            label="修改时间"
            align="center"
        />
        <el-table-column
            prop="updateId"
            label="修改人id"
            align="center"
        />
        </el-table>
      </el-drawer>

    </div>
    <!--    分页
      page-size:表示每一页的大小，默认值是10
      current-page:表示当前页数，默认是1，支持.sync修饰，current-page等于多少页，这一页高亮


    -->
    <div class="page-box">
      <el-pagination
          layout="prev, pager, next"
          :current-page="currentPage"
          :page-size="pageSize"
          @current-change="pageChange"
          :total="1000">
      </el-pagination>
    </div>

    <div>
      <!--    新建、编辑的弹窗-->
      <el-dialog
          title="新建"
          :visible.sync="editDialog"
          width="40%">

        <el-form ref="formData" label-width="80px">
          <el-form-item label="品牌名称">
            <el-input v-model="formData.brandName"></el-input>
          </el-form-item>
          <el-form-item label="品牌站点">
            <el-input v-model="formData.brandSite"></el-input>
          </el-form-item>
          <el-form-item label="品牌描述">
            <el-input v-model="formData.brandDesc"></el-input>
          </el-form-item>
          <el-form-item label="品牌logo">
            <el-input v-model="formData.brandLogo"></el-input>
          </el-form-item>
<!--          <el-form-item>-->
<!--            <el-button type="primary" @click="onSubmit" size="mini">立即创建</el-button>-->
<!--            <el-button size="mini">取消</el-button>-->
<!--          </el-form-item>-->
        </el-form>

        <span slot="footer" class="dialog-footer">
        <el-button @click="editDialog = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="editDialog = false, addOrEdit()" size="mini">确定</el-button>
      </span>
      </el-dialog>
    </div>

<!--    删除的弹窗-->
    <el-dialog
        title="温馨提示"
        :visible.sync="delDialog"
        refs="dataTable"
        width="30%">
      <span>确定要删除{{ids}}吗？？！！</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delDialog = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="delDialog = false,deleteByIds()" size="mini">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script src="./index.js">

</script>

<style scoped lang="less">
@import "./index.less";
</style>
