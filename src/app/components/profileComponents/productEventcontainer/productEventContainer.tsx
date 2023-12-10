"use client";
import { Swiper, SwiperRef, Tabs } from "antd-mobile";
import EventList from "@/app/components/eventComponents/eventList/eventList";
import { useEffect, useRef, useState } from "react";
import { Skeleton } from "antd";
import MyProductList from "@/app/components/productComponents/myProductList/myProductList";
import { myProductListHandler } from "@/app/api-client/gifts";

function ProductEventContainer() {
  const [productList, setProductList] = useState();
  const swiperRef = useRef<SwiperRef>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const tabItems = [
    { key: "Desired Gift", title: "Desired Gift" },
    { key: "Events", title: "My Events" },
  ];

  useEffect(() => {
    (async () => {
      const ProductList = await myProductListHandler();
    
      setProductList(ProductList.gifts);
    })();
  }, [setProductList]);
  
  return (
    <>
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
    </>
  );
}

export default ProductEventContainer;
