import instance from "../../service/ConfigAxios"

const ClientRegisterApi = {
    clientRegister(data) {
        const url = `/register`
        return instance.post(url, data)
    }
}

export default ClientRegisterApi