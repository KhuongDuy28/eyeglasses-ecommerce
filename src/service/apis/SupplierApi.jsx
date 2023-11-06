import instance from "../../service/ConfigAxios"

const SupplierApi = {
    getAllSupplier() {
        const url = `/admin/suppliers`
        return instance.get(url)
    },

    deleteSupplier(id) {
        const url = `/admin/suppliers/${id}`
        return instance.delete(url)
    },

    addSupplier(data) {
        const url = `/admin/suppliers`
        return instance.post(url, data)
    },

    getSupplierByID(id) {
        const url = `/admin/suppliers/${id}`
        return instance.get(url)
    },

    updateSupplier(data) {
        const url = `/admin/suppliers/${data.id}`
        return instance.patch(url, data.dataUpdate)
    },

    searchSupplier(supplierName) {
        const url = `/admin/suppliers?supplierName=${supplierName}`
        return instance.get(url)
    }
}

export default SupplierApi