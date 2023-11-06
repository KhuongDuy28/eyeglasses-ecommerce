import instance from "../../service/ConfigAxios"

const SliderApi = {
    getAllSlider() {
        const url = `/slider`
        return instance.get(url)
    },

    deleteSlider(id) {
        const url = `/slider/${id}`
        return instance.delete(url)
    },

    addSlider(data) {
        const url = `/slider`
        return instance.post(url, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },

    searchSlider(name) {
        const url = `/slider?name=${name}`
        return instance.get(url)
    }
}

export default SliderApi