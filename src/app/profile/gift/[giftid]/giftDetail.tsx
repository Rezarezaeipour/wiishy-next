"use client";
import { loadGiftHandler } from "@/app/api-client/gifts";
import ProductList from "@/app/components/productList/productList";
import { Product, ProductComplete } from "@/types";
import { HeartOutlined } from "@ant-design/icons";
import { Avatar, Button, Dialog, Rate, Toast } from "antd-mobile";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function GiftDetail(props: { giftid: number }) {
  const [isLike, setIslike] = useState<boolean>();
  const [giftDetail, setGiftDetail] = useState<ProductComplete>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await loadGiftHandler(props.giftid);
      if (response) {
        console.log("dkm", response.islike);
        setIslike(response.islike);
        setGiftDetail(response.gift_detail[0]);
      }
    })();
  }, [loadGiftHandler, setIslike, setGiftDetail]);

  return (
    <>
      {giftDetail ? (
        <div className="py-5 px-4">
          <Link
            className="text-black"
            href={`/profile/profile/${giftDetail.user_id}`}
          >
            <div className="flex flex-row mt-2 mb-3 p-2 pb-0 items-center justify-between">
              <div className="flex flex-row items-center justify-start">
                <Avatar
                  src={`https://wiishy-backend.ir/${giftDetail.user_image_url}`}
                  style={{ "--size": "50px", "--border-radius": "50px" }}
                />
                <div>
                  <p className="text-l font-normal ml-2">
                    {giftDetail.name} {giftDetail.family}
                  </p>
                  <p className="text-sm font-thin ml-2">
                    30 years old | Berlin
                  </p>
                </div>
              </div>
              <div>
                <Button className="btn btn-regular-outline">Follow</Button>
              </div>
            </div>
          </Link>
          <>
            <div className="flex justify-center pt-2 w-full">
              <Image
                src={`https://wiishy-backend.ir/${giftDetail.gift_image_url}`}
                width={300}
                height={250}
                alt="wiishy user"
                style={{
                  width: "100%",
                  height: "250px",
                  objectFit: "cover",
                  borderRadius: "15px",
                }}
              />
            </div>

            <div className="flex flex-row mt-3 align-middle justify-between">
              <Rate
                style={{ "--star-size": "25px" }}
                readOnly
                value={giftDetail.desire_rate || 4}
                className="pt-0.5"
              />
              <div className="flex flex-row items-center justify-end">
                <p className="text-black text-[17px] font-light pt-1">35</p>
                <Rate
                  character={<HeartOutlined style={{ fontSize: "25px" }} />}
                  count={1}
                  allowClear
                  defaultValue={isLike ? 1 : 0}
                />
              </div>
              {isLike}
            </div>
            <div className="mt-1">
              <p className="text-left font-bold text-[30px]">
                {giftDetail.gift_name}
              </p>
              <p className="text-left font-medium text-[20px] mt-1">
                ${giftDetail.gift_price}
              </p>
              <p className="text-left font-light text-[13px] mt-1">
                {giftDetail.gift_desc}
              </p>
            </div>

            <div className="flex flex-row pb-5 px-0 mt-2 ">
              <Button
                loading={loading}
                type="submit"
                className="btn btn-regular w-full m-1 basis-3/5"
                style={{ fontSize: "14px" }}
              >
                Add to my wish list +
              </Button>
              <Button
                loading={loading}
                type="button"
                className="btn btn-regular-outline w-full m-1 basis-2/5"
                style={{ fontSize: "14px" }}
                onClick={async () => {
                  const result = await Dialog.confirm({
                    content: "Are you sure to delete this Gift?",
                    confirmText: "Yes",
                    cancelText: "No",
                    onConfirm: async () => {},
                    onCancel: async () => {
                      Toast.show({
                        content: "Delete aborted",
                        position: "bottom",
                      });
                    },
                  });
                }}
              >
                Buy Online
              </Button>
              {/* END SUBMIT BUTTON */}
            </div>
          </>
        </div>
      ) : (
        <p></p>
      )}

      <div className="pb-4 mt-0">
        {giftDetail ? (
          <ProductList userId={giftDetail?.user_id}></ProductList>
        ) : (
          <p>Loading</p>
        )}
      </div>
    </>
  );
}