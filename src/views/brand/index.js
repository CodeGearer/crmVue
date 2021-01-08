import brand from "@/api/brand";
export default {
    name: "index.vue",
    methods: {
        handleClick(row) {
            console.log(row);
        },
        async findAll () {
            let response = await brand.findAll(this.currentPage, this.pageSize);
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
                await brand.update(this.formData);
            } else {//没有表示新增
                await brand.add(this.formData);
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
            this.formData = await brand.findById(id);
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
                await brand.deleteById(this.ids);
            }
            this.findAll();
        },

        onSubmit() {}
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
            ids:[]
        }
    }
}
