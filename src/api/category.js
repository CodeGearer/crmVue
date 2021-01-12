import axios from '../utils/baseAxios';
let category = {
    //findAll
    findAll(currentPage, pageSize, formInline) {
        return axios.post(`category/searchPage?currentPage=${currentPage}&pageSize=${pageSize}`, formInline)
    },

    //findById
    findById(id) {
        return axios.get(`category/${id}`);
    },

    //add
    add(category) {
        return axios.post(`category`, category);
    },

    //update
    update(category) {
        return axios.put(`category`, category);
    },

    //deleteById
    deleteById(ids) {
        return axios.delete(`category/${ids}`);
    }
}
export default category;
