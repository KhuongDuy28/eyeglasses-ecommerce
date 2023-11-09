import instance from "../../service/ConfigAxios"

const CategoryApi = {
    getAllCategoty() {
        const url = `/admin/categories`
        return instance.get(url)
    },

    deleteCategory(id) {
        const url = `/admin/categories/${id}`
        return instance.delete(url)
    },

    addCategory(data) {
        const url = `/admin/categories`
        return instance.post(url, data)
    },

    getCategoryByID(id) {
        const url = `/admin/categories/${id}`
        return instance.get(url)
    },

    updateCategory(data) {
        const url = `/admin/categories/${data.id}`
        return instance.patch(url, data.dataUpdate)
    },

    searchCategory(categoryName) {
        const url = `/admin/categories?categoryName=${categoryName}`
        return instance.get(url)
    },

    //client
    getAllCategotyClient() {
        const url = `/categories`
        return instance.get(url)
    },

    getCategoryByIDClient(id) {
        const url = `/categories-by-id-client/${id}`
        return instance.get(url)
    }

}

export default CategoryApi