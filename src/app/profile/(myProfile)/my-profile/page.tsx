"use client";
import MyProductList from "@/app/components/myProductList/myProductList";
import MyProfileWrapper from "@/app/components/myProfileWrapper/myProfileWrapper";

import { Suspense, useEffect, useState } from "react";
import getLoadInfo from "../../../hooks/useLoadInfo";
import { myProductListHandler } from "@/app/api-client/gifts";
import { Skeleton } from "antd";
import { DotLoading } from "antd-mobile";

function MyProfile() {
  const [productList, setProductList] = useState();
  const [newuser, setNewuser] = useState<{
    name: string;
    family: string;
    user_gender: string;
    followings: number;
    followers: number;
    user_desc: string;
    user_image_url: string;
  }>();

  useEffect(() => {
    (async () => {
      const ProductList = await myProductListHandler();
      setProductList(ProductList.gifts);

      const data = await getLoadInfo();
      setNewuser(data.user);
    })();
  }, []);

  return (
    <>
      <div className="py-5 px-2">
        {!newuser ? (
          <div className="flex flex-col items-center">
            <Skeleton.Avatar active={true} size={150} shape={"circle"} />
            <Skeleton
              paragraph={{ rows: 5 }}
              active
              className="mt-3 text-center"
            />
          </div>
        ) : (
          <MyProfileWrapper
            image={
              newuser && newuser.user_image_url ? newuser?.user_image_url : ""
            }
            name={newuser && newuser.name ? newuser?.name : "Name"}
            family={newuser && newuser.family ? newuser?.family : "Family"}
            gender={
              newuser && newuser.user_gender ? newuser?.user_gender : "Gender"
            }
            location=""
            followings={newuser?.followings}
            followers={newuser?.followers}
            bio={newuser && newuser.user_desc ? newuser?.user_desc : "..."}
          />
        )}

        <div className="grid grid-cols-2 gap-0 mt-7 mb-10">
          {productList ? (
            <MyProductList productList={productList} />
          ) : (
            <div
              className="text-center w-full mx-auto"
              style={{ color: "#000" }}
            >
              <Skeleton
                paragraph={{ rows: 5 }}
                active
                className="mt-3 text-center"
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default MyProfile;
