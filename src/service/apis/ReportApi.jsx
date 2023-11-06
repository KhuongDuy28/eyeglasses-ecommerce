import instance from "../ConfigAxios"

const ReportApi = {
    getReport(data) {
        const url = `/admin/analys?date_from=${data.date_from}&date_to=${data.date_to}`
        return instance.get(url)
    },

    getTotalProduct() {
        const url = `/admin/total_product`
        return instance.get(url)
    },

    getTotalAccount() {
        const url = `/admin/total_user`
        return instance.get(url)
    }
}

export default ReportApi