import axios from '../utils/baseAxios';
let goods = {
    //findAll
    findAll(currentPage, pageSize, formInline) {
        return axios.post(`goods/searchPage?currentPage=${currentPage}&pageSize=${pageSize}`, formInline);
    },

    //findById
    findById(id) {
        return axios.get(`goods/${id}`);
    },

    //add
    add(goods) {
        return axios.post(`goods`, goods);
    },

    //update
    update(goods) {
        return axios.put(`goods`, goods);
    },

    //deleteById
    deleteById(ids) {
        return axios.delete(`goods/${ids}`);
    }
}
export default goods;
