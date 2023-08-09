
import { motion } from "framer-motion"
import animateJourney from "@/layout/animations/FadeUp"
import { useState } from "react"
import Button from "@/components/button/Button"
import { IconBlade, IconCut, IconGift, IconRazor } from "@tabler/icons-react"
import { ProductModel } from "@/data/Products"
import Image from "next/image"



interface ProdutosProps {
    products: ProductModel[]
    setCorte: (sendCorte: { name: string, value: number }) => void
  }
  
  export default function Produtos(props: ProdutosProps) {
    const [selectedProduct, setSelectedProduct] = useState<{ name: string, value: number } | null>(null);
  
    const handleProductClick = (product: ProductModel) => {
      setSelectedProduct({ name: product.name, value: product.value });
    };
  
    const handleButtonClick = () => {
      if (selectedProduct) {
        props.setCorte({ name: selectedProduct.name, value: selectedProduct.value });
      }
    };
  
    return (
      <motion.div
        className="w-full flex flex-col gap-5 mt-5 h-full p-5"
        variants={animateJourney}
        initial="start"
        animate="visible"
        exit="end"
      >
        {props.products.map((product) => (
          <Produto
            key={product.id}
            product={product}
            selected={selectedProduct?.name === product.name}
            onProductClick={handleProductClick}
          />
        ))}
        <div className="w-full font-poppins">
          <Button variant="primary" onClick={handleButtonClick}>
            Próximo
          </Button>
        </div>
      </motion.div>
    );
  }
  



interface ProdutoProps {
    product: ProductModel
    selected: boolean
    onProductClick?: (product: ProductModel) => void
}


function Produto(props: ProdutoProps) {
    const { product, selected, onProductClick } = props;
  
    const handleClick = () => {
      if (onProductClick) {
        onProductClick(product);
      }
    };
  
    return (
      <div
        className={`flex border w-full cursor-pointer p-1 rounded-md transition-all justify-stretch items-center bg-darkTheme ${
          selected ? "border-[#db9b33]" : "border-zinc-800"
        }`}
        onClick={handleClick}
      >
            <div className="w-1/4">
                <Image src={`/${product.image}`} alt="" draggable="false" className="rounded-md" width={90} height={90}/>
            </div>
            <div className="flex flex-col w-full text-zinc-800">
                {product.type == "barba" ? <IconRazor/> : ""}
                {product.type == "cabelo" ? <IconCut/> : ""}
                {product.type == "sobrancelha" ? <IconBlade/> : ""}
                {product.type == "combo" ? <IconGift/> : ""}
                <div className="flex items-center justify-center">
                    <div className={`transition-all
                    ${selected ? "text-[#db9b33]" : "text-white"}`}>
                        {product.name}
                    </div>
                </div>
                <div className="font-poppins">
                    R$
                    <b>{product.value},00</b> 
                </div>
            </div>
        </div>
    )
}
