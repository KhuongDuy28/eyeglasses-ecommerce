const colorNames = [
    'Red', 'Orange', 'Yellow', 'Green', 'Blue',
    'Purple', 'Pink', 'Brown', 'Gray', 'Black',
    'White', 'Cyan', 'Magenta', 'Lime', 'Indigo',
    'Teal', 'Maroon', 'Navy', 'Olive', 'Aqua',
    'Coral', 'Gold', 'Violet', 'Silver', 'Beige',
    'Turquoise', 'Salmon', 'SteelBlue', 'SlateGray'
];
  
const dataListColor = colorNames.map((color, index) => ({ 
    id: index + 1, 
    name: color 
}));
  
export default dataListColor;