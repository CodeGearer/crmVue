import axios from '../utils/baseAxios';
let brand = {
    //findAll
    findAll(currentPage, pageSize) {
        return axios.get(`brand?currentPage=${currentPage}&pageSize=${pageSize}`)
    },

    //findById
    findById(id) {
        return axios.get(`brand/${id}`);
    },

    //add
    add(brand) {
        return axios.post(`brand`, brand);
    },

    //update
    update(brand) {
        return axios.put(`brand`, brand);
    },

    //deleteById
    deleteById(ids) {
        return axios.delete(`brand/${ids}`);
    }
}
export default brand;
