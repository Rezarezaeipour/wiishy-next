"use client";
import { likeGift, loadGiftHandler, unLikeGift } from "@/app/api-client/gifts";
import { amIfollowHim, followUser, unFollowUser } from "@/app/api-client/users";
import ProductList from "@/app/components/profileComponents/productList/productList";
import { Product, ProductComplete } from "@/types";
import { HeartOutlined } from "@ant-design/icons";
import { Skeleton } from "antd";
import { Avatar, Button, Dialog, Rate, Toast } from "antd-mobile";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function GiftDetail(props: { giftid: number }) {
  const [isLike, setIslike] = useState<boolean>();
  const [likecount, setLikeCount] = useState<number>(0);
  const [isfollow, setIsfollow] = useState(false);
  const [giftDetail, setGiftDetail] = useState<ProductComplete>();
  const [loading, setLoading] = useState(false);
  const [floading, setFloading] = useState(false);
  const [useId, setUserId] = useState(0);
  const [giftImageUrl, setGiftImageUrl] = useState("");
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const response = await loadGiftHandler(props.giftid);
      if (response) {
    
        setIslike(response.islike);
        setGiftDetail(response.gift_detail[0]);
        setLikeCount(parseInt(response.gift_detail[0].gift_like));
        setGiftImageUrl(response.gift_detail[0].user_image_url);
        setUserId(response.gift_detail[0].user_id);
        const res = await amIfollowHim(response.gift_detail[0].user_id);
        res.isfollow ? setIsfollow(true) : setIsfollow(false);
      }
    })();
  }, [setIslike, setGiftDetail, props.giftid]);

  const likeit = async (giftDetail: number) => {
    likeGift(giftDetail);
    setIslike(true);
    setLikeCount((old) => old + 1);
  };

  const unLikeit = async (giftDetail: number) => {
    unLikeGift(giftDetail);
    setIslike(false);
    setLikeCount((old) => (old != 0 ? old - 1 : old));
  };

  return (
    <>
      {giftDetail ? (
        <div className="py-5 px-4">
          <div className="h-profile-container flex flex-row mt-2 mb-3 p-2 pb-0 items-center justify-between">
            <Link
              className="text-black"
              href={`/profile/profile/${giftDetail.user_id}`}
            >
              <div className="flex flex-row items-center justify-start">
                <Avatar
                  src={`https://wiishy-backend.ir${giftImageUrl}`}
                  style={{ "--size": "50px", "--border-radius": "50px" }}
                />
                <div>
                  <p className="text-l font-normal ml-2">
                    {giftDetail.name} {giftDetail.family}
                  </p>
                  <p className="text-sm font-thin ml-2">
                    {" "}
                    {`${giftDetail.age} years old`}
                  </p>
                </div>
              </div>
            </Link>
            <div>
              {isfollow ? (
                <Button
                  loading={floading}
                  onClick={async () => {
                    setFloading(true);
                    const result = await unFollowUser(useId);
                    result.status == "success"
                      ? setIsfollow(false)
                      : setIsfollow(true);
                    setFloading(false );
                  }}
                  className="btn btn-regular-outline"
                >
                  Unfollow
                </Button>
              ) : (
                <Button
                  loading={floading}
                  onClick={async () => {
                    setFloading(true);
                    const result = await followUser(useId);
                    result.status == "success"
                      ? setIsfollow(true)
                      : setIsfollow(false);
                    setFloading(false);
                  }}
                  className="btn btn-regular-outline"
                >
                  Follow
                </Button>
              )}
            </div>
          </div>

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
                  borderRadius: "10px",
                  border:"solid thin #d4d4d4"
                }}
                //  onError={()=>{this.src}}
              />
            </div>

            <div className="flex flex-row mt-3 align-middle justify-between">
              <div className="flex flex-row items-center">
                <Rate
                  style={{ "--star-size": "20px" }}
                  readOnly
                  value={giftDetail.desire_rate || 4}
                  className="pt-0.5"
                />
              </div>
              <div className="flex flex-row items-center justify-end">
                <p className="text-black text-[17px] font-light pt-1">
                  {likecount}
                </p>
                <Rate
                  style={{ "--active-color": "red" }}
                  character={<HeartOutlined style={{ fontSize: "25px" }} />}
                  count={1}
                  allowClear
                  defaultValue={isLike ? 1 : 0}
                  onChange={() => {
                    giftDetail.gift_id
                      ? isLike
                        ? unLikeit(giftDetail.gift_id)
                        : likeit(giftDetail.gift_id)
                      : "";
                  }}
                />
              </div>
              {isLike}
            </div>
            <div className="mt-1">
              <p className="text-left font-bold text-[20px]">
                {giftDetail.gift_name}
              </p>
              <p className="text-left font-medium text-[18px] mt-1">
                ${giftDetail.gift_price}
              </p>
              <p className="text-left font-light text-[13px] mt-1">
                {giftDetail.gift_desc}
              </p>
            </div>

            <div className="flex flex-row gap-1 pb-5 px-0 mt-3 betwee ">
              <Button
                loading={loading}
                type="submit"
                className="btn btn-regular w-full m-1 basis-3/5"
              
                onClick={async () => {
                  const result = await Dialog.confirm({
                    content:
                      "Are you sure you want to add it to your collection?",
                    confirmText: "Yes",
                    cancelText: "No",
                    onConfirm: async () => {
                      router.push(`/profile/new-added-gift/${props.giftid}`)
                    },
                  });
                }}
              >
                Add to my wish list
              </Button>
            
              <Button
                loading={loading}
                type="button"
                className="btn btn-regular-outline w-full m-1 ml-2 basis-2/5"
                onClick={() => {
                  giftDetail.gift_url
                    ? router.push(`${giftDetail.gift_url}?utm=wiishy`)
                    : Toast.show({
                        content: "There is a problem in loading your data",
                        position: "bottom",
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
        <div className="py-5 px-4 pt-0">
          <Skeleton avatar paragraph={{ rows: 1 }} />
          <Skeleton
            paragraph={{ rows: 5 }}
            active
            className="mt-3 p-3 text-center"
          />
        </div>
      )}

      <div className="pb-4 mt-0">
        {giftDetail ? (
          <ProductList userId={giftDetail?.user_id}></ProductList>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-0 mt-7 mb-10">
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
          </>
        )}
      </div>
    </>
  );
}
