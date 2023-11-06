import instance from "../../service/ConfigAxios"

const AuthApi = {
    login(data) {
        const url = `/login`
        return instance.post(url, data)
    }
}

export default AuthApi