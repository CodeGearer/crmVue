<template>
  <div class="entity-box">
    <!--  操作的部分-->
    <div class="execute-box">
      <el-button-group>
        <el-button type="primary" @click="editDialog = true,formData={}">新建</el-button>
        <el-button type="danger">删除<i></i></el-button>
      </el-button-group>
<!--      <el-button type="primary" plain>新建</el-button>-->
<!--      <el-button type="danger" plain >删除</el-button>-->
    </div>
    <!--    搜索查询-->
    <div class="search-box">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="审批人">
          <el-input v-model="formInline.user" placeholder="审批人"></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select v-model="formInline.region" placeholder="活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
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
          style="width: 100%">
        <!--        选择框-->
        <el-table-column
            type="selection"
            width="55"
            align="center"/>

        <el-table-column
            prop="date"
            label="id"
            align="center"
        />
        <el-table-column
            prop="name"
            label="运营商名称"
            align="center"
        />
        <el-table-column
            prop="address"
            label="联系人"
            align="center"
        />
        <el-table-column
            prop="address"
            label="联系人邮件"
            align="center"
        />
        <el-table-column
            prop="address"
            label="运营商地址"
            show-overflow-tooltip
            align="center"
        />

        <el-table-column
            prop="address"
            label="开户行"
            show-overflow-tooltip
            align="center"
        />
        <el-table-column
            prop="address"
            label="开户行账号"
            align="center"
        />
        <el-table-column
            prop="address"
            label="添加时间"
            align="center"
        />
        <el-table-column
            prop="address"
            label="添加人id"
            align="center"
        />

        <el-table-column
            prop="address"
            label="修改时间"
            align="center"
        />
        <el-table-column
            prop="address"
            label="修改人id"
            align="center"
        />
        <el-table-column
            fixed="right"
            label="操作"
            align="center"
        >
          <!--          必须将按钮添加到template中，为了取值-->
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>

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
      <!--    新建弹窗-->
      <el-dialog
          title="新建"
          :visible.sync="editDialog"
          width="40%"
          :before-close="handleClose">

        <el-form ref="form" label-width="80px">
          <el-form-item label="运营商名称">
            <el-input v-model="formData.supplierName"></el-input>
          </el-form-item>
          <el-form-item label="联系人">
            <el-input v-model="formData.supplierContact"></el-input>
          </el-form-item>
          <el-form-item label="联系电话">
            <el-input v-model="formData.supplierPhone"></el-input>
          </el-form-item>
          <el-form-item label="公司邮箱">
            <el-input v-model="formData.supplierEmail"></el-input>
          </el-form-item>
          <el-form-item label="公司地址">
            <el-input v-model="formData.supplierAddress"></el-input>
          </el-form-item>
          <el-form-item label="开户行">
            <el-input v-model="formData.supplierBrank"></el-input>
          </el-form-item>
          <el-form-item label="银行卡号">
            <el-input v-model="formData.supplierBrankCode"></el-input>
          </el-form-item>
<!--          <el-form-item>-->
<!--            <el-button type="primary" @click="onSubmit" size="mini">立即创建</el-button>-->
<!--            <el-button size="mini">取消</el-button>-->
<!--          </el-form-item>-->
        </el-form>

        <span slot="footer" class="dialog-footer">
        <el-button @click="editDialog = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="editDialog = false, addOrEdit()" size="mini">立即创建</el-button>
      </span>
      </el-dialog>
    </div>

  </div>
</template>

<script src="./index.js">

</script>

<style scoped lang="less">
@import "./index.less";
</style>
