'use client'
import MyProductCard from "@/app/components/myProductCard/MyProductCard";
import { Product } from "@/types";

function MyProductList(props : { productList : [Product] }) {
    console.log('propsPage',props.productList)
    return ( 
        <>
          {
            props.productList.map((Item,index) => {
                return (
                    <MyProductCard key={'prd'+index} gift_name={Item.gift_name}  gift_price={Item.gift_price} desire_rate={Item.desire_rate} />
                )
            })
          } 
        </>
     );
}

export default MyProductList;