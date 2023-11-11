const shapeNames = [
    'Browline', 'Hình vuông', 'Mắt mèo', 'Oval'
]

const dataListShape = shapeNames.map((shape, index) => ({
    id: index + 1,
    name: shape
}))

export default dataListShape