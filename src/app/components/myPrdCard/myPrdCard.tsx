"use client";
import { Rate } from "antd-mobile";
import "./style.module.css";
import "@/app/globals.css";
import { Product } from "@/types";
import { EyeOutline, LikeOutline } from "antd-mobile-icons";
import Link from "next/link";
import { Skeleton } from "antd";
import grayLogo from "../../../../public/logo/wiishy-gray.jpg";
import Image from "next/image";
import { HeartOutlined } from "@ant-design/icons";

function MyPrdCard(props: Product) {
  return !props ? (
    <Skeleton.Image active />
  ) : (
    <Link href={`/profile/edit-gift/${props.gift_id}`}>
      <div className="p-2 pb-7 rounded-[10px] relative">
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
          <h2 className="font-bold text-md mt-5">
            {props.gift_name || "Macbook Air M2 15"}
          </h2>
          <div className="flex flex-row mt-2 align-middle justify-between">
            <p className="text-sm font-normal">
              {`$${props.gift_price}` || "$1400"}{" "}
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
  );
}

export default MyPrdCard;
