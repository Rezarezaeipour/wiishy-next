"use client";
import MyProductList from "@/app/components/productComponents/myProductList/myProductList";
import MyProfileWrapper from "@/app/components/profileComponents/myProfileWrapper/myProfileWrapper";

import { useEffect, useRef, useState } from "react";
import { myProductListHandler } from "@/app/api-client/gifts";
import { Skeleton } from "antd";
import { getMyData } from "@/app/api-client/users";
import { Swiper, SwiperRef, Tabs } from "antd-mobile";
import EventList from "@/app/components/eventComponents/eventList/eventList";
import { chatting } from "@/app/api-client/ai";

function MyProfile() {
  const [productList, setProductList] = useState();
  const [newuser, setNewuser] = useState<{
    id: number;
    name: string;
    family: string;
    user_gender: string;
    followings: number;
    followers: number;
    user_desc: string;
    user_image_url: string;
  }>();

  const swiperRef = useRef<SwiperRef>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const tabItems = [
    { key: "Desired", title: "Desired" },
    { key: "Events", title: "Events" },
  ];

  useEffect(() => {
    (async () => {
      const xx = chatting();
      const ProductList = await myProductListHandler();
      setProductList(ProductList.gifts);
      const data = await getMyData(0);
      setNewuser(data.users);
    })();
  }, [setNewuser, setProductList]);

  return (
    <>
      <div className="py-5 px-2">
        {!newuser ? (
          <div className="flex flex-col items-center pt-5">
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
            id={newuser && newuser.id ? newuser?.id : 0}
          />
        )}

        <div className="mt-7">
          <Tabs
            activeKey={tabItems[activeIndex].key}
            onChange={(key) => {
              const index = tabItems.findIndex((item) => item.key === key);
              setActiveIndex(index);
              swiperRef.current?.swipeTo(index);
            }}
            style={{ "--title-font-size": "13px" }}
          >
            {tabItems.map((item) => (
              <Tabs.Tab title={item.title} key={item.key} />
            ))}
          </Tabs>

          <Swiper
            direction="horizontal"
            loop
            indicator={() => null}
            ref={swiperRef}
            defaultIndex={activeIndex}
            onIndexChange={(index) => {
              setActiveIndex(index);
            }}
          >
            <Swiper.Item>
              <div className="grid grid-cols-2 gap-0 mt-3 mb-10">
                {productList ? (
                  <MyProductList productList={productList} />
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
            </Swiper.Item>
            <Swiper.Item>
              <div className="mt-2 mb-10">
                <EventList />
              </div>
            </Swiper.Item>
          </Swiper>
        </div>
      </div>
    </>
  );
}

export default MyProfile;
