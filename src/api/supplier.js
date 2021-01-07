import axios from '../utils/baseAxios';
let supplier = {
    //findAll
    findAll(currentPage, pageSize) {
        return axios.get(`supplier?currentPage=${currentPage}&pageSize=${pageSize}`)
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
    }
}
export default supplier;
