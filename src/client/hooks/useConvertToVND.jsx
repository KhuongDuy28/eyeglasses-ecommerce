const useConvertToVND = () => {
    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    })

    return {
        VND
    }
}

export default useConvertToVND