import instance from "../../service/ConfigAxios"

const UserApi = {
    getAllUser() {
        const url = `/admin/users`
        return instance.get(url)
    },

    deleteUser(id) {
        const url = `/admin/users/${id}`
        return instance.delete(url)
    },

    addUser(data) {
        const url = `/admin/users`
        return instance.post(url, data, {
            headers: {
                "Content-Type" : "multipart/form-data"
            }
        })
    },

    getUserByID(id) {
        const url = `/admin/users/${id}`
        return instance.get(url)
    },

    updateUser(data) {
        const url = `/admin/users/${data.id}`
        return instance.patch(url, data.dataUpdate)
    },

    searchUser(data) {
        const url = `/admin/users?name=${data.name}&email=${data.email}`
        return instance.get(url)
    },

    changePassword(data) {
        const url = `/change_password`
        return instance.post(url, data)
    },

    getProfileClient(id) {
        const url = `/profile/${id}`
        return instance.get(url)
    },
}

export default UserApi