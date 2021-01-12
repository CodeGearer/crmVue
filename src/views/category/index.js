import category from "@/api/category";
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
            let response = await category.findAll(this.currentPage, this.pageSize, this.formInline);
            console.log(this.formInline)
            console.log(response)
            this.total = response.total;
            this.tableData = response.list;
            // console.log(this.tableData);
            // if(status == 200000) {
            //
            // }
        },
        async addOrEdit () {
            console.log("11111")
            if(this.formData.id) {//如果有ID说明是修改
                await category.update(this.formData);
            } else {//没有表示新增
                // console.log("222222");
                // console.log(this.formData);
                await category.add(this.formData);
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
            this.formData = await category.findById(id);
            console.log(this.formData)
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
                await category.deleteById(this.ids);
            }
            this.findAll();
        },
        //查询
        onSubmit () {
            //拿到搜索框输入的值
            // console.log(this.formInline),
            this.findAll ();
            // console.log()
        },

        //详情
        detail() {}
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
                name: '',
            },
            tableData: [],
            ids:[]
        }
    }
}
