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
    },

    vnpay(data) {
        // console.log(data);
        const url = `/vnpay/payment`
        return instance.post(url, data) 
    },

    orderVNPay(data) {
        const url = `/order-vnpay`
        return instance.post(url, data)
    },

    momo(data) {
        // console.log(data);
        const url = `/momo/payment`
        return instance.post(url, data) 
    },

    orderMomo(data) {
        const url = `/order-momo`
        return instance.post(url, data)
    },

}

export default OrderApi