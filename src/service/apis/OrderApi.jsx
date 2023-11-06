import instance from "../ConfigAxios"

const OrderApi = {
    order(data) {
        const url = `/order`
        return instance.post(url, data)
    },

    orderHistory() {
        const url = `/order_history`
        return instance.get(url)
    },

    cancelOrder(order_id) {
        const url = `/cancel_order/${order_id}`
        return instance.delete(url)
    }
}

export default OrderApi