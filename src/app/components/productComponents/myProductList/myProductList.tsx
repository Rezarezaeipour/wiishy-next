"use client";
import { Product } from "@/types";
import MyPrdCard from "@/app/components/productComponents/myPrdCard/myPrdCard";

 
function MyProductList(props: { productList: [Product] }) {
 
  return (
    <>
      {props.productList.map((Item, index) => {
        return (
          <MyPrdCard
            key={"prd" + index}
            gift_name={Item.gift_name}
            gift_price={Item.gift_price}
            desire_rate={Item.desire_rate}
            gift_like={Item.gift_like}
            gift_view={Item.gift_view}
            gift_id={Item.gift_id}
            gift_image_url={Item.gift_image_url}
            price_unit = {Item.price_unit}
          />
        );
      })}
    </>
  );
}

export default MyProductList;
