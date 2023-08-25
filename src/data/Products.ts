

export interface ProductModel{
    id: number
    name: string
    type: string
    value: number
    image: string
}

const Products: ProductModel[] = [
    {
        id: 1,
        name: "Cabelo",
        type: "cabelo",
        value: 35,
        image: "haircuts/cabelo.jpeg"
    },
    {
        id: 2,
        name: "Barba",
        type: "barba",
        value: 30,
        image:  "haircuts/barba.jpg"
    },
    {
        id: 3,
        name: "Sobrancelha",
        type: "sobrancelha",
        value: 10,
        image:  "haircuts/sobrancelha.jpeg"
    },
    {
        id: 4,
        name: "Combo Cabelo + Barba",
        type: "combo_simples",
        value: 55,
        image:  "haircuts/combo_simples.jpeg"
    },
    {
        id: 5,
        name: "Combo Triplo",
        type: "combo",
        value: 65,
        image:  "haircuts/combo.jpg"
    }
]

export default Products;