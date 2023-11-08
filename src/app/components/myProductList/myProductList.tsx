"use client";
import { Product } from "@/types";
import MyProductCard from "@/app/components/myProductCard/myProductCard";

function MyProductList(props: { productList: [Product] }) {
  
  return (
    <>
      {props.productList.map((Item, index) => {
        return (
          <MyProductCard
            key={"prd" + index}
            gift_name={Item.gift_name}
            gift_price={Item.gift_price}
            desire_rate={Item.desire_rate}
            gift_like={Item.gift_like}
            gift_view={Item.gift_view}
            gift_id={Item.gift_id}
            gift_image_url={Item.gift_image_url}
          />
        );
      })}
    </>
  );
}

export default MyProductList;
