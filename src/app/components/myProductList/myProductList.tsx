'use client'
import MyProductCard from "@/app/components/myProductCard/MyProductCard";
import { Product } from "@/types";


function MyProductList(props : { productList : [Product] }) {
   
    return ( 
        <>
          {
            props.productList.map((Item,index) => {
                return (
                    <MyProductCard key={'prd'+index} title={Item.title} image={Item.image} price={Item.price} rate={Item.rate} />
                )
            })
          } 
        </>
     );
}

export default MyProductList;