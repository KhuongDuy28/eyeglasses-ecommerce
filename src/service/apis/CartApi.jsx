import instance from "../ConfigAxios"


const CartApi = {
    addProductInCartLogged(data) {
        const url = `/cart`
        return instance.post(url, data)
    },

    getCartByUser() {
        const url = `/cart`
        return instance.get(url)
    },

    deleteProductInCartLogged(id) {
        const url = `/cart/${id}`
        return instance.delete(url)
    },

    updateQuantity(data) {
        const url = `/cart/${data.id}`
        return instance.patch(url, data.dataUpdate)
    },

    deleteMultipleProductOfCart(data) {
        data.map((id) => {
            const url = `/cart/${id}`
            return instance.delete(url)
        })
    },

}

export default CartApi