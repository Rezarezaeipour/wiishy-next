"use client";
import { productListHandler } from "@/app/api-client/gifts";

import { Product } from "@/types";
import { Skeleton } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import ProductCard from "../../productComponents/productCard/productCard";

function ProductList(props: { userId: number }) {
  const [gifts, setGifts] = useState<[Product]>();
  useEffect(() => {
    (async () => {
      const ProductList = await productListHandler(props.userId);
      setGifts(ProductList.gifts);
    })();
  }, [props.userId]);

  return (
    <>
      <div className="grid grid-cols-2 gap-0 mt-7 mb-10">
        {gifts ? (
          gifts.length > 0 ? (
            gifts.map((Item, index) => {
              return (
                <ProductCard
                  key={"prd" + index}
                  gift_name={Item.gift_name}
                  gift_url={Item.gift_url}
                  gift_price={Item.gift_price}
                  desire_rate={Item.desire_rate}
                  gift_id={Item.gift_id}
                  gift_image_url={Item.gift_image_url}
                />
              );
            })
          ) : (
            <p className="my-auto">Noting Added anything yet</p>
          )
        ) : (
          <>
            <Skeleton
              paragraph={{ rows: 5 }}
              active
              className="mt-3 p-3 text-center"
            />
            <Skeleton
              paragraph={{ rows: 5 }}
              active
              className="mt-3 p-3 text-center"
            />
             <Skeleton
              paragraph={{ rows: 5 }}
              active
              className="mt-3 p-3 text-center"
            />
             <Skeleton
              paragraph={{ rows: 5 }}
              active
              className="mt-3 p-3 text-center"
            />
          </>
        )}
      </div>
    </>
  );
}

export default ProductList;
