export function ConvertFromLocationToText(textString) {

    switch (textString) {
        case '': return 'Trang chủ';
        case 'products': return 'Sản phẩm';
        case 'eyeglass-frames': return 'Gọng kính';
        case 'contact-lens': return 'Kính áp tròng';
        case 'the-lens': return 'Tròng kính';
        case 'sunglass': return 'Kính râm';
        case 'children-glasses': return 'Gọng kính trẻ em'
    }
 
    return textString
}