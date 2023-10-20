'use client'
import ProductCard from "@/app/components/myProductCard/MyProductCard";
import { Product } from "@/types";


function ProductList(props : { productList : [Product] }) {
    return ( 
        <>
          {
            props.productList.map((Item,index) => {
                return (
                    <ProductCard key={'prd'+index}  gift_name={Item.gift_name} gift_url={Item.gift_url} gift_price={Item.gift_price} desire_rate={Item.desire_rate} />
                )
            })
          } 
        </>
     );
}

export default ProductList;