"use client";
import { Avatar, Rate } from "antd-mobile";
import "./style.module.css";
import "@/app/globals.css";
import { ProductComplete } from "@/types";
import Link from "next/link";
import { Skeleton } from "antd";
import grayLogo from "../../../../../public/logo/wiishy-gray.jpg";
import Image from "next/image";
import { HeartOutlined } from "@ant-design/icons";

function ProductCardComplete(props: ProductComplete) {
  return !props ? (
    <Skeleton.Image active />
  ) : (
    <div className="flex flex-col pb-5" style={{border:'solid thin #e4e4e4',marginBottom:'10px',borderRadius:'5px', backgroundColor:'#F7F7F7'}}>
      <Link href={`/profile/profile/${props.user_id}`}>
        <div className="flex flex-row mt-2 mb-2 p-2 pb-0 items-center justify-left">
          <Avatar
            src={`https://wiishy-backend.ir/${props.user_image_url}`}
            style={{ "--size": "50px", "--border-radius": "30px" }}
          />
          <div className="h-full">
            <div className="text-sm font-normal ml-2">
              {props.name} {props.family} 
            </div>
            <p className="text-xs font-thin ml-2">{`${props.age} years old`}</p>
          </div>
        </div>
      </Link>
      <Link href={`/profile/gift/${props.gift_id}`}>
        <div className="p-2 rounded-[10px] relative">
          <Image
            alt={props.gift_name || "image name"}
            className="rounded-[10px] w-full h-auto"
            src={
              props.gift_image_url
                ? `https://wiishy-backend.ir/${props.gift_image_url}`
                : grayLogo.src
            }
            height={300}
            width={300}
            style={{
              width: "100%",
              height: "auto",
              aspectRatio: " 1 / 1",
              objectFit: "cover",
            }} // optional
          ></Image>
          <div className="flex flex-col float-right top-4 right-4 absolute">
            <div className="flex items-center gap-x-1">
              <HeartOutlined />
              <p className="text-sm font-normal leading-[16px]">
                {props.gift_like || "0"}
              </p>
            </div>
          </div>
          <div>
            <h2 className="font-bold text-lg mt-3 ">
              {props.gift_name || "Macbook Air M2 15"}
            </h2>
            <div className="flex flex-row mt-2 align-middle justify-between">
              <p className="text-md font-normal">
                {`${props.price_unit}${props.gift_price}` || "$1400"}{" "}
              </p>
              <Rate
                style={{ "--star-size": "12px" }}
                readOnly
                value={props.desire_rate || 4}
                className="pt-0.5"
              />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ProductCardComplete;
