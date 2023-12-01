import unidecode from 'unidecode';

const useUnidecode = () => {
    const searchUnidecode = (text, option) => {
        // Chuyển đổi chuỗi có dấu thành chuỗi không dấu
        const optionLabelWithoutDiacritics = unidecode(option?.label ?? '');
    
        // Chuyển đổi chuỗi tìm kiếm có dấu thành chuỗi không dấu
        const searchTextWithoutDiacritics = unidecode(text);
    
        // Kiểm tra xem chuỗi không dấu của lựa chọn có chứa chuỗi không dấu tìm kiếm hay không
        return optionLabelWithoutDiacritics.toLowerCase().includes(searchTextWithoutDiacritics.toLowerCase());
    };

    return {
        searchUnidecode
    }

}

export default useUnidecode