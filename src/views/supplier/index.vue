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
        <el-form-item label="输入搜索内容">
          <el-input v-model="formInline.name" placeholder="输入搜索内容"></el-input>
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
            prop="supplierName"
            label="运营商名称"
            align="center"
        />
        <el-table-column
            prop="supplierContact"
            label="联系人"
            align="center"
        />
        <el-table-column
            prop="supplierPhone"
            label="联系人电话"
            align="center"
        />
        <el-table-column
            prop="supplierEmail"
            label="联系人邮件"
            align="center"
        />
        <el-table-column
            prop="supplierAddress"
            label="运营商地址"
            show-overflow-tooltip
            align="center"
        />

        <el-table-column
            prop="supplierBrank"
            label="开户行"
            show-overflow-tooltip
            align="center"
        />
        <el-table-column
            prop="supplierBrankCode"
            label="开户行账号"
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
            <el-button @click="detail(), detailDialog=true" type="text" size="small">详情</el-button>
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
      <!--    新建、编辑的弹窗-->
      <el-dialog
          title="新建"
          :visible.sync="editDialog"
          width="40%">

        <el-form ref="formData" label-width="80px">
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

<!--          添加或修改公司地址-->
          <div class=" form-group row">
<!--            **************-->
          <select ref="province"  name="" class="form-control" @change="getCity" v-model="provinceIndex">
            <option value="-1">请选择省</option>
            <option :value="item.id" :label="item.name" v-for="(item,index) in provinceList" :key="index">{{item.name}}</option>
          </select>

          <select id="city"  name="" class="form-control" @change="getArea" v-model="cityIndex">
            <option value="-1">请选择市</option>
            <option :value="item.id" :label="item.name" v-for="(item,index) in cityList" :key="index">{{item.name}}</option>
          </select>

          <select id="area"  name="" class="form-control" @change="getRoad" v-model="areaIndex">
            <option value="-1">请选择区</option>
            <option :value="item.id" :label="item.name" v-for="(item,index) in areaList" :key="index">{{item.name}}</option>
          </select>

          <select id="road"  name="" class="form-control" @change="getRoad" v-model="roadIndex">
            <option value="-1">请选择街道</option>
            <option :value="item.id" :label="item.name" v-for="(item,index) in roadList" :key="index">{{item.name}}</option>
          </select>
            <el-input v-model="inputText" placeholder="请输入详细地址"></el-input>
          </div>

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
      <span>确定要删除{{ids}}吗！！！！！</span>
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
