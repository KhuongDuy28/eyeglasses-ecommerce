import instance from "../ConfigAxios"

const MaterialApi = {
    getAllMaterial() {
        const url = `/admin/materials`
        return instance.get(url)
    },

    addMaterial(data) {
        const url = `/admin/materials`
        return instance.post(url, data)
    },    

    deleteMaterial(id) {
        const url = `/admin/materials/${id}`
        return instance.delete(url)
    },

    updateMaterial(data) {
        const url = `/admin/materials/${data.id}`
        return instance.patch(url, data.dataUpdate)
    },

    searchMaterialByName(name) {
        const url = `/admin/materials?name=${name}`
        return instance.get(url)
    },

    //client
    getAllMaterialClient() {
        const url = `/material`
        return instance.get(url)
    },
}

export default MaterialApi