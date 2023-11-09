import instance from "../../service/ConfigAxios"

const SliderApi = {
    getAllSlider() {
        const url = `/admin/slider`
        return instance.get(url)
    },

    deleteSlider(id) {
        const url = `/admin/slider/${id}`
        return instance.delete(url)
    },

    addSlider(data) {
        const url = `/admin/slider`
        return instance.post(url, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },

    changeStatusSlider(data) {
        const url = `/admin/change-status-slider`
        return instance.post(url, data)
    },

    searchSlider(name) {
        const url = `/admin/slider?name=${name}`
        return instance.get(url)
    },


    //client
    getSliderActive() {
        const url = `slider-active`
        return instance.get(url)
    }
}

export default SliderApi