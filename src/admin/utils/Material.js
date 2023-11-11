const materialNames = [
    'Acetate', 'Kim loại', 'Nhựa', 'Nhựa dẻo'
]

const dataListMaterial = materialNames.map((material, index) => ({
    id: index + 1,
    name: material
}))

export default dataListMaterial