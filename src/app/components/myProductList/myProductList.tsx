'use client'
import ProductCard from "@/app/components/productCard/productCard";
import { Product } from "@/types";


function NyProductList(props : { productList : [Product] }) {
    return ( 
        <>
          {
            props.productList.map((Item,index) => {
                return (
                    <ProductCard key={'prd'+index} title={Item.title} image={Item.image} price={Item.price} rate={Item.rate} />
                )
            })
          } 
        </>
     );
}

export default NyProductList;