export function ConvertToURl(text) {
    // Chuyển chữ tiếng Việt có dấu thành chữ không dấu
    text = text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  
    // Thay dấu cách bằng dấu '-'
    text = text.replace(/\s+/g, '-');
  
    // Loại bỏ các ký tự đặc biệt và chỉ giữ lại ký tự, số và dấu '-'
    text = text.replace(/[^a-zA-Z0-9-]/g, '');
  
    // // Loại bỏ dấu '-' liền nhau
    // text = text.replace(/-+/g, '-');
  
    // Chuyển đổi thành chữ thường (tuỳ chọn)
    text = text.toLowerCase();
  
    return text;
}
  