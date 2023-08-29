

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
        name: "Combo Cabelo + Sobrancelha",
        type: "combo",
        value: 45,
        image:  "haircuts/combo.jpeg"
    },
    {
        id: 5,
        name: "Combo Cabelo + Barba", 
        type: "combo_simples",
        value: 55,
        image:  "haircuts/combo_simples.jpeg"
    },
    {
        id: 6,
        name: "Combo Triplo",
        type: "combo_triplo",
        value: 65,
        image:  "haircuts/combo_triplo.jpg"
    }
]

export default Products;