export default {
    name: "index.vue",
    methods: {
        handleClick(row) {
            console.log(row);
        },
        async findAll () {
            // let response = supplier.findAll();
        },
        async addOrEdit () {
            // console.log("11111")
            if(this.formData.id) {//如果有ID说明是修改
                await supplier.updateEntity(this.formData);
            } else {//没有表示新增
                await supplier.addEntity(this.formData);
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
            }, tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }]
        }
    }
}
