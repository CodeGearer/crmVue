import supplier from "@/api/supplier";
export default {
    name: "index.vue",
    created() {
        this.findAll();
        this.getProvinces();
    },
    methods: {
        handleClick(row) {
            console.log(row);
        },
        async findAll () {
            let response = await supplier.findAll(this.currentPage, this.pageSize, this.formInline);
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
        },

        async findById (id) {
            console.log(id)
            this.formData = await supplier.findById(id);
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
                await supplier.deleteById(this.ids);
            }
            this.findAll();
        },

        onSubmit () {
            this.findAll();
        },

        //详情
        detail() {},

        //获取省
        async getProvinces() {
            let response = await supplier.getAddress(0);
            // console.log(response.result)
            this.provinceList = response.result;
            console.log(this.provinceList);
            console.log(this.provinceIndex);
        },

        //获取市
        async getCity () {

            if(this.provinceIndex == -1) {
                this.provinceName = "";

                this.cityName = "";
                this.cityList = [];
                this.cityIndex = -1;

                this.areaName = "";
                this.areaList = [];
                this.areaIndex = -1;
            }else {

                //************
                this.provinceName = this.$refs.province.selectedLabel
                console.log(this.provinceName)
                let response = await supplier.getAddress(this.provinceIndex);
                this.cityList = response.result;
            }
        },

        //获取区
        async getArea(e) {

            console.log(e)
            if(this.cityIndex == -1) {
                this.cityName = "";

                this.areaName = "";
                this.areaList = [];
                this.areaIndex = -1;

                this.roadName = "";
                this.roadList = [];
                this.roadIndex = -1;
            } else {
                let response = await supplier.getAddress(this.cityIndex);
                // console.log(this.cityItem.id)
                // console.log(this.cityItem.name)
                console.log()
                this.areaName = response.result.name
                this.areaList = response.result;
            }
        },

        //获取街道
        async getRoad() {

            if(this.areaIndex == -1) {
                this.areaName = "";
                this.roadName = "";
                this.roadList = [];
                this.roadIndex = -1;
            } else {
                let response = await supplier.getAddress(this.areaIndex);
                this.roadList = response.result;
            }

        },

    },

    data() {
        return {
            currentPage: 1,
            pageSize: 5,
            total: 0,
            // name:'',
            // status: 0,
            editDialog: false,
            delDialog: false,
            detailDialog: false,
            formData: {},
            formInline: {
                user: '',
                region: ''
            },
            tableData: [],
            ids:[],
            inputText:'',

            provinceList:[],
            provinceIndex:-1,
            provinceName:"",

            //定义市的参数
            cityList:[],
            cityIndex:-1,
            cityName:"",
            cityItem:{},

            areaList:[],
            areaIndex:-1,
            areaName:'',

            roadList:[],
            roadIndex:-1,
            roadName:''
        }
    }
}
