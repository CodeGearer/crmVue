import axios from '../utils/baseAxios';
let supplier = {
    //findAll
    findAll(currentPage, pageSize, formInline) {
        return axios.post(`supplier/searchPage?currentPage=${currentPage}&pageSize=${pageSize}`, formInline)
    },

    //findById
    findById(id) {
        return axios.get(`supplier/${id}`);
    },

    //add
    add(supplier) {
        return axios.post(`supplier`, supplier);
    },

    //update
    update(supplier) {
        return axios.put(`supplier`, supplier);
    },

    //deleteById
    deleteById(ids) {
        return axios.delete(`supplier/${ids}`);
    },

    getAddress(parentId) {
        return axios.get(`common/${parentId}`);
    }
}
export default supplier;
