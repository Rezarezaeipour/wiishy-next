"use client";
import { loadGiftHandler } from "@/app/api-client/gifts";
import { Product, ProductComplete } from "@/types";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function GiftDetail(props: { giftid: number }) {
  const [isLike, setIslike] = useState<boolean>();
  const [giftDetail, setGiftDetail] = useState<ProductComplete>();

  useEffect(() => {
    (async () => {
      const response = await loadGiftHandler(props.giftid);
      if (response) {
        setIslike(response.islike);
        setGiftDetail(response.gift_detail[0]);
      }
    })();
  }, [loadGiftHandler, setIslike, setGiftDetail]);

  return (
    <>
      {giftDetail ? (
        <>
          <Image
            src={`https://wiishy-backend.ir/${giftDetail.gift_image_url}`}
            alt={giftDetail.gift_name ? giftDetail.gift_name : " "}
            width={200}
            height={100}
          ></Image>
          <p>{giftDetail.gift_name}</p>
          <p>{giftDetail.gift_desc}</p>
        </>
      ) : (
        <p></p>
      )}
    </>
  );
}
