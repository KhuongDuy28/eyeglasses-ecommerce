const useGetCurrentTime = () => {
    const currentDate = new Date();
  
    // Lấy ngày, tháng, năm
    const year = currentDate.getFullYear(); // Lấy hai chữ số cuối của năm
    const month = currentDate.getMonth() + 1; // Tháng bắt đầu từ 0
    const day = currentDate.getDate();
  
    // Định dạng lại theo "yy-mm-dd"
    const timeCurrent= `${year < 10 ? '0' : ''}${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
  
    return {
        timeCurrent
    }
}; 

export default useGetCurrentTime