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

        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="员工姓名">
                <span>{{ props.row.adminName }}</span>
              </el-form-item>
              <el-form-item label="员工密码">
                <span>{{ props.row.adminPassword }}</span>
              </el-form-item>
              <el-form-item label="身份证号">
                <span>{{ props.row.adminCode }}</span>
              </el-form-item>
              <el-form-item label="员工地址">
                <span>{{ props.row.adminAddress }}</span>
              </el-form-item>
              <el-form-item label="员工部门">
                <span>{{ props.row.adminDept }}</span>
              </el-form-item>
              <el-form-item label="delFlag">
                <span>{{ props.row.delFlag }}</span>
              </el-form-item>
              <el-form-item label="创建者ID">
                <span>{{ props.row.creatorId }}</span>
              </el-form-item>
              <el-form-item label="创建时间">
                <span>{{ props.row.addTime }}</span>
              </el-form-item>
              <el-form-item label="修改者ID">
                <span>{{ props.row.updateId }}</span>
              </el-form-item>
              <el-form-item label="修改时间">
                <span>{{ props.row.updateTime }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>

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
            prop="nickName"
            label="账户昵称"
            align="center"
        />
        <el-table-column
            prop="adminAccount"
            label="账户名称"
            align="center"
        />
        <el-table-column
            prop="adminEmail"
            label="邮箱"
            align="center"
        />
        <el-table-column
            prop="adminPhone"
            label="电话"
            align="center"
        />
        <el-table-column
            prop="adminSex"
            label="性别"
            align="center"
        >
          <template v-slot="obj">
            <el-tag v-if="obj.row.adminSex == 0">男</el-tag>
            <el-tag v-if="obj.row.adminSex == 1" type="danger">女</el-tag>
            <el-tag v-if="obj.row.adminSex == 2" type="success">未知</el-tag>
          </template>
        </el-table-column>
        <el-table-column
            prop="adminAvatar"
            label="头像"
            align="center"
        >
          <template v-slot="obj">
            <el-avatar shape="square" :src="obj.row.adminAvatar"></el-avatar>
          </template>
        </el-table-column>
        <el-table-column
            prop="adminStatus"
            label="是否可用"
            align="center"
        >
          <template v-slot="obj">
            <el-switch
              v-model="obj.row.adminStatus"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
            prop="adminName"
            label="员工姓名"
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

        <el-form ref="formData" :rules="rules" :model="formData" label-width="80px">

          <el-tabs v-model="activeName">
            <el-tab-pane label="用户基础信息" name="first">

              <el-form-item label="员工姓名" prop="adminName">
                <el-input v-model="formData.adminName" placeholder="请输入姓名"></el-input>
              </el-form-item>
              <el-form-item label="账户信息" prop="adminAccount">
                <el-input v-model="formData.adminAccount" placeholder="数字信息下划线8～10位"></el-input>
              </el-form-item>
              <el-form-item label="员工昵称" prop="nickName">
                <el-input v-model="formData.nickName" placeholder="员工昵称"></el-input>
              </el-form-item>
              <el-form-item label="员工性别" prop="adminSex">
                <el-radio-group v-model="formData.adminSex">
                  <el-radio :label="'0'">男</el-radio>
                  <el-radio :label="'1'">女</el-radio>
                  <el-radio :label="'2'">未知</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="员工部门" prop="adminDept">
                <el-input v-model="formData.adminDept" placeholder="员工部门，不能为空"></el-input>
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="信息" name="second">

              <el-form-item label="员工邮箱" prop="adminEmail">
                <el-input v-model="formData.adminEmail" placeholder="邮箱"></el-input>
              </el-form-item>
              <el-form-item label="员工电话" prop="adminPhone">
                <el-input v-model="formData.adminPhone" placeholder="员工电话"></el-input>
              </el-form-item>

              <el-form-item label="员工地址" prop="adminAddress">
                <el-input v-model="formData.adminAddress" type="textarea" placeholder="员工地址，不能为空"></el-input>
              </el-form-item>

            </el-tab-pane>
            <el-tab-pane label="角色管理" name="third">

              <el-form-item label="员工头像">
                <el-upload
                    class="avatar-uploader"
                    action=""
                    accept="image/*"
                    :show-file-list="false"
                    :http-request="avatarUpload"
                    :before-upload="beforeAvatarUpload">
                  <img v-if="imageUrl" :src="imageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="员工身份证号" prop="adminCode">
                <el-input v-model="formData.adminCode" placeholder="员工身份证号"></el-input>
              </el-form-item>
              <el-form-item label="员工状态">
                <el-switch
                    v-model="formData.adminStatus"
                    active-color="#13ce66"
                    inactive-color="#ff4949">
                </el-switch>
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="定时任务补偿" name="fourth">
              <el-form-item label="员工工资" prop="adminSalary">
                <el-input v-model="formData.adminSalary" placeholder="员工工资"></el-input>
              </el-form-item>
            </el-tab-pane>
          </el-tabs>


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

<style lang="less">
@import "./index.less";
</style>
