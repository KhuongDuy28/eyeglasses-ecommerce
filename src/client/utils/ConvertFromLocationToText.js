export function ConvertFromLocationToText(textString) {

    switch (textString) {
        case '': return 'Trang chủ';
        case 'products': return 'Sản phẩm';
        case 'gong-kinh': return 'Gọng kính';
        case 'trong-kinh': return 'Tròng kính';
        case 'kinh-ram': return 'Kính râm';
        case 'kinh-tre-em': return 'Gọng kính trẻ em';
        case 'gong-kinh-tre-em': return 'Gọng kính trẻ em'
    }
 
    return textString
}