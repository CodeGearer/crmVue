import goods from "@/api/goods";
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
            let response = await goods.findAll(this.currentPage, this.pageSize, this.formInline);
            console.log(response)
            this.total = response.total;
            this.tableData = response.list;
            console.log(this.tableData);
            // if(status == 200000) {
            //
            // }
        },
        async addOrEdit () {
            // console.log("11111")
            if(this.formData.id) {//如果有ID说明是修改
                await goods.update(this.formData);
            } else {//没有表示新增
                await goods.add(this.formData);
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
            this.formData = await goods.findById(id);
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
                await goods.deleteById(this.ids);
            }
            this.findAll();
        },

        onSubmit () {
            this.findAll();
        },

    },

    data() {
        return {
            currentPage: 1,
            pageSize: 5,
            total: 0,
            editDialog: false,
            delDialog: false,
            formData: {},
            formInline: {
                user: '',
                region: ''
            },
            tableData: [],
            ids:[],

        }
    }
}
