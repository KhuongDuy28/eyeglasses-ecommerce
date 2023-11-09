import instance from "../ConfigAxios"

const OrderProcessApi = {
    getOrderByStatus(status) {
        const url = `/admin/orders?status=${status}`
        return instance.get(url)
    },

    changeStatusOrder(data) {
        const url = `/admin/change_status_order`
        return instance.post(url, data)
    },

    cancelOrder(order_id) {
        const url = `admin/cancel_order/${order_id}`
        return instance.delete(url)
    },

    getOrderByOrderCode(data) {
        const url = `admin/order-by-ordercode?status=${data?.status}&order_code=${data.order_code}`
        return instance.get(url)
    },

    getOrderByID(order_id) {
        const url = `admin/orders/${order_id}`
        return instance.get(url)
    }
}

export default OrderProcessApi