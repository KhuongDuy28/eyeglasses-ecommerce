import instance from "../../service/ConfigAxios"

const AddressApi = {
    getAllTinh() {
        const url = `/tinh`
        return instance.get(url)
    },

    getAllQuanByTinh(tinh_id) {
        const url = `/quan?tinh_id=${tinh_id}`
        return instance.post(url)
    },

    getAllXaByQuan(quan_id) {
        const url = `/xa?quan_id=${quan_id}`
        return instance.post(url)
    }

}

export default AddressApi