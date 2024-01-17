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
      <div className="mb-10 pt-6">
        {gifts ? (
          gifts.length > 0 ? (
            <div className="grid grid-cols-2 gap-0 mb-10">
              {" "}
              {gifts.map((Item, index) => {
                return (
                  <ProductCard
                    key={"prd" + index}
                    gift_name={Item.gift_name}
                    gift_url={Item.gift_url}
                    gift_price={Item.gift_price}
                    desire_rate={Item.desire_rate}
                    gift_id={Item.gift_id}
                    gift_image_url={Item.gift_image_url}
                    gift_like={Item.gift_like}
                  />
                );
              })}
            </div>
          ) : (
            <div className="w-full">
              <p className="my-auto text-center w-full pt-4">
                Noting Added anything yet
              </p>
            </div>
          )
        ) : (
          <div className="grid grid-cols-2 gap-0 mb-10">
            <div>
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
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ProductList;
