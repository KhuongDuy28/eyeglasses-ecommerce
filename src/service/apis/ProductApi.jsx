import instance from "../../service/ConfigAxios"

const ProductApi = {
    getAllProduct() {
        const url = `/admin/products-admin`
        return instance.get(url)
    },

    addProduct(data) {
        // console.log(data)
        const url = `/admin/products`
        return instance.post(url, data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
    },

    getProductByID(id) {
        const url = `/admin/products/${id}`
        return instance.get(url)
    },

    updateProduct(data) {
        const url = `/admin/update-product`
        return instance.post(url, data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
    },

    changeStatusProduct(data) {
        const url = `/admin/change_status_product`
        return instance.post(url, data)
    },

    searchProductByName(productName) {
        const url = `/admin/products-by-name?productName=${productName}`
        return instance.get(url)
    },


    //client
    getAllProductClient() {
        const url = `/product`
        return instance.get(url)
    },

    getAllProductByCategory(id) {
        const url = `/product?category=${id}`
        return instance.get(url)
    },

    getProductDetailsClientByID(id) {
        const url = `/product-details/${id}`
        return instance.get(url)
    },

    getProductsSale() {
        const url = `/product_has_price_new`
        return instance.get(url)
    },

    get10ProductNew() {
        const url = `/product/10-product`
        return instance.get(url)
    },

    sortProductClient(data) {
        const url = `/product?category=${data.category}&shape_id=${data.shape_id}&material_id=${data.material_id}&min_price=${data?.min_price}&max_price=${data.max_price}`
        return instance.get(url)
    },

    searchProductClient(data) {
        // console.log(data);
        const url = `/product-by-name?category=${data.category}&shape_id=${data.shape_id}&material_id=${data.material_id}&min_price=${data?.min_price}&max_price=${data.max_price}&productName=${data.productName}&orderBy=${data?.orderBy}`
        return instance.get(url)
    },
    
}

export default ProductApi