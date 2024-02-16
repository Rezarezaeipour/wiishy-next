"use client";

import { ProductComplete } from "@/types";
import ProductCardComplete from "@/app/components/productComponents/productCardComplete/productCardComplete";

function MyFollowingsProductList(props: { productList: [ProductComplete] }) {
  console.log('props',props);
  return (
    <>
      {props.productList.map((Item : any, index) => {
        return (
          <ProductCardComplete
            key={"prd" + index}
            gift_name={Item.gift_name}
            gift_price={Item.gift_price}
            price_unit={Item.price_unit}
            desire_rate={Item.desire_rate}
            gift_like={Item.gift_like}
            gift_view={Item.gift_view}
            gift_id={Item.gift_id}
            gift_image_url={Item.gift_image_url}
            name={Item.user.name}
            family={Item.user.family}
            user_image_url={Item.user.user_image_url}
            user_id={Item.user_id}
            age={Item.user.age}
          />
        );
      })}
    </>
  );
}

export default MyFollowingsProductList;
