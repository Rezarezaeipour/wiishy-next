"use client";
import { Swiper, SwiperRef, Tabs } from "antd-mobile";
import EventList from "@/app/components/eventComponents/eventList/eventList";
import { useEffect, useRef, useState } from "react";
import { Skeleton } from "antd";
import MyProductList from "@/app/components/productComponents/myProductList/myProductList";
import { myProducedProduct, myProductListHandler, myWishesProduct } from "@/app/api-client/gifts";

function ProductEventContainer(props:any) {
  const [productList, setProductList] = useState();
  const [wishList, setWishList] = useState();
  const swiperRef = useRef<SwiperRef>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const tabItems = [
    { key: "Wish list", title: "Wish list" },
    { key: "My Shop", title: "My Shop" },
    { key: "Events", title: "Event Reminder" },
  ];

  useEffect(() => {
    (async () => {
      const ProductList = await myProducedProduct();    // What I produced
      const WishList = await myWishesProduct();    // What I wish to have 
      setActiveIndex(props.defaultTab == '1' ? 2 : 0);
      swiperRef.current?.swipeTo(props.defaultTab == '1' ? 2 : 0);
      setProductList(ProductList.gifts); 
      setWishList(WishList.gifts); 
    })();
  }, [setProductList,setWishList,props.defaultTab]);
  
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
            {wishList ? (
              <MyProductList productList={wishList} />
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
          <div className="mt-2 mb-10 pt-3">
            <EventList />
          </div>
        </Swiper.Item>
      </Swiper>
    </>
  );
}

export default ProductEventContainer;
