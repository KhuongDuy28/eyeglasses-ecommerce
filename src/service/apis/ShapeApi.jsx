import instance from "../ConfigAxios"

const ShapeApi = {
    getAllShape() {
        const url = `/admin/shapes`
        return instance.get(url)
    },

    addShape(data) {
        const url = `/admin/shapes`
        return instance.post(url, data)
    },    

    deleteShape(id) {
        const url = `/admin/shapes/${id}`
        return instance.delete(url)
    },

    updateShape(data) {
        const url = `/admin/shapes/${data.id}`
        return instance.patch(url, data.dataUpdate)
    },

    searchShapeByName(name) {
        const url = `/admin/shapes?name=${name}`
        return instance.get(url)
    },

    //client
    getAllShapeClient() {
        const url = `/shape`
        return instance.get(url)
    },

}

export default ShapeApi