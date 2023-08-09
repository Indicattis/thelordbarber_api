

import { IconBlade, IconCut, IconRazor } from "@tabler/icons-react"
import Button from "@/components/button/Button"
import useProcess from "@/data/hooks/useProcess"
import { ProductModel } from "@/data/Products"
import Image from "next/image"


interface ProductListProps {
    products: ProductModel[] 
}

export default function ProductList(props: ProductListProps) {
    return (
        <section className="flex gap-3 w-4/5 mt-10 flex-wrap pb-10">
            {props.products.map(product => {
                return <ProductItem key={product.id} product={product}></ProductItem>
            })}
        </section>
    )
}

interface ProductItemProps {
    product: ProductModel
}

function ProductItem(props: ProductItemProps) {
    const {product} = props

    const {processing, processInit, processEnd} = useProcess()

    async function haircutImport() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(1)
            }, 1000)
        })
    }
    async function haircutImportSucess() {
        try {
            processInit()
            await haircutImport()
        }
        finally {
            processEnd()
        }
    }
    return (
        <div className=" flex flex-col p-2 font-poppins
        bg-whiteColor rounded-sm overflow-hidden shadow-xl">
            <Image src={`/${product.image}`} alt="" draggable="false" className="rounded-sm" width={1000} height={1000}/>
            <div className="flex justify-between w-full">
                <h4 className="p-1 font-semibold text-xl text-default">
                   {product.type == "barba" ? <IconRazor/> : ""}
                   {product.type == "cabelo" ? <IconCut/> : ""}
                   {product.type == "sobrancelha" ? <IconBlade/> : ""}
                    
                </h4>
                <h4 className="p-1 text-base font-semibold text-default font-senthir">{product.name}</h4>
            </div>
            <Button variant="light"
             onClick={haircutImportSucess}>
                <b>
                {processing ? (
                    <Image alt="" src="/gif/Rolling-0.7s-204px.gif" className="w-6" width={1000} height={1000}/>
                ) : (
                   'R$'+product.value+',00'
                )}</b>
                </Button>
        </div>
    )
}