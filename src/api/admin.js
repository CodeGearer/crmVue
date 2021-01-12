import axios from '../utils/baseAxios';
let admin = {
    //findAll
    findAll(currentPage, pageSize, formInline) {
        return axios.post(`admin/searchPage?currentPage=${currentPage}&pageSize=${pageSize}`, formInline);
    },

    //findById
    findById(id) {
        return axios.get(`admin/${id}`);
    },

    //add
    add(admin) {
        return axios.post(`admin`, admin);
    },

    //update
    update(admin) {
        return axios.put(`admin`, admin);
    },

    //deleteById
    deleteById(ids) {
        return axios.delete(`admin/${ids}`);
    },
    uploadAvatar(formData) {
        return axios.post(`common/upload`,formData,{headers:{"content-Type":"multipart/form-data"}});
    }
}
export default admin;
