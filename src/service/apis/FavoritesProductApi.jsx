import instance from "../ConfigAxios"

const FavoritesProductApi = {
    getListFavoritesProduct() {
        const url = `/wish_list`
        return instance.get(url)
    },

    addListFavoritesProduct(data) {
        const url = `/wish_list`
        return instance.post(url, data)
    },

    deleteFavoritesProduct(id) {
        const url = `/wish_list/${id}`
        return instance.delete(url)
    },

    deleteMultipleFavoritesProduct(data) {
        data.map((id) => {
            const url = `/wish_list/${id}`
            return instance.delete(url)
        })
    }
}

export default FavoritesProductApi