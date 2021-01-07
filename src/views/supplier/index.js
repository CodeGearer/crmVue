import supplier from "@/api/supplier";
export default {
    name: "index.vue",
    methods: {
        handleClick(row) {
            console.log(row);
        },
        async findAll () {
            let response = await supplier.findAll(this.currentPage, this.pageSize);
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
                await supplier.update(this.formData);
            } else {//没有表示新增
                await supplier.add(this.formData);
            }
            this.findAll()
        },

        pageChange(pageNum) {
            this.currentPage = pageNum;
            this.findAll();
            console.log(pageNum)
        }
    },

    data() {
        return {
            currentPage: 1,
            pageSize: 5,
            total: 0,
            editDialog: false,
            formData: {},
            formInline: {
                user: '',
                region: ''
            },
            tableData: []
        }
    }
}
