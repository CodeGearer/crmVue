import admin from "@/api/admin";
export default {
    name: "index.vue",
    created() {
        this.findAll();
    },
    methods: {
        handleClick(row) {
            console.log(row);
        },
        async findAll () {
            let response = await admin.findAll(this.currentPage, this.pageSize, this.formInline);
            // console.log(response)
            this.total = response.total;
            this.tableData = response.list;
            // console.log(this.tableData);
            // if(status == 200000) {
            //
            // }
        },
        async addOrEdit () {
            // console.log("11111")
            if(this.formData.id) {//如果有ID说明是修改
                await admin.update(this.formData);
            } else {//没有表示新增
                await admin.add(this.formData);
            }
            this.findAll()
        },

        pageChange(pageNum) {
            this.currentPage = pageNum;
            this.findAll();
            console.log(pageNum)
        },

        async findById (id) {
            console.log(id)
            this.formData = await admin.findById(id);
            console.log(this.formData)
        },

        selectionChangeListener (selection) {
            this.ids = [];
            selection.forEach(aa => this.ids.push(aa.id));
            console.log(this.ids);
        },

        async deleteByIds () {
            if(this.ids.length == 0) {
                this.$message.error("哥，还没选呢！");
            } else {
                await admin.deleteById(this.ids);
            }
            this.findAll();
        },

        //条件查询
        onSubmit() {
            this.findAll();
        },

        //上传之后的回调函数
        handleAvatarSuccess() {

        },

        //上传之前的回调函数
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
            const isLt2M = file.size / 1024 < 200;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG、png 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },

        //文件上传方法
        async avatarUpload(file) {
            let formData = new FormData();
            formData.append("avatar",file.file);
            this.imageUrl = await admin.uploadAvatar(formData);
            this.formData.adminAvatar = this.imageUrl;
        },

        //详情
        detail() {

        }
    },

    data() {
        return {
            currentPage: 1,
            pageSize: 5,
            total: 0,
            editDialog: false,
            delDialog: false,
            detailDialog: false,
            formData: {},
            formInline: {
                name:'',
            },
            tableData: [],
            ids:[],
            drawer: false,
            direction: 'rtl',
            activeName:'first',
            imageUrl:'',
            rules: {
                adminName: [
                    { required: true, message: '请输入员工姓名', trigger: 'blur' },
                    // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                adminAccount: [
                    { required: true, message: '不能为空', trigger: 'blur' },
                    { pattern: /^[a-zA-Z][a-zA-Z0-9_]{6,8}$/, message: '账户必须是数字字母下划线6～8位', trigger: 'change' }
                ],
                nickName: [
                    { required: true, message: '昵称不能为空', trigger: 'blur' },
                    { min: 6, max: 8, message: '长度在 6 到 8 个字符', trigger: 'blur' }
                ],
                adminDept: [
                    { required: true, message: '不能为空', trigger: 'blur' },
                ],
                adminEmail: [
                    { required: true, message: '邮箱不能为空', trigger: 'blur' },
                    { type:'email',message: '邮箱不正确', trigger: 'change' }
                ],
                adminPhone: [
                    { required: true, message: '手机号不能为空', trigger: 'blur' },
                    { pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/, message: '手机号不正确', trigger: 'change' }
                ],
                adminAddress: [
                    { required: true, message: '地址不能为空', trigger: 'blur' }
                ],
                adminSex: [
                    { required: true, message: '性别不能为空', trigger: 'blur' }
                ],
                adminCode: [
                    { required: true, message: '身份证号不能为空', trigger: 'blur' },
                    { pattern: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/, message: '身份证号不正确', trigger: 'change' }
                ],
                adminSalary: [
                    { required: true, message: '必须发工资', trigger: 'blur' },
                    // { pattern: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/, message: '身份证号不正确', trigger: 'change' }
                ],
            }
        }
    }
}
