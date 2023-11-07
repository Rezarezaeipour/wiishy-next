"use client";
import { loadMyFollowingProductlist } from "@/app/api-client/gifts";
import MyFollowingsProductList from "@/app/components/myFollowingsProductList/myFollowingsProductList";
import { Skeleton } from "antd";
import { useEffect, useState } from "react";

function Home() {
  const [count, setCount] = useState(0);
  const [giftlist, setGiftlist] = useState();

  useEffect(() => {
    (async () => {
      const res = await loadMyFollowingProductlist();

      setCount(res.followings_gifts_coun);
      setGiftlist(res.followings_gifts);
    })();
  }, []);

  return (
    <>
      <div className="py-5 px-2 w-full h-screen">
        <h1 className="main-head">Home</h1>
        {giftlist ? (
          <div className="grid grid-cols-2 gap-0 mt-7 mb-10 ">
            <MyFollowingsProductList productList={giftlist} />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-0 mt-7 mb-10 ">
            <Skeleton className="mb-2"  avatar paragraph={{ rows: 3 }} />
            <Skeleton className="mb-2"  avatar paragraph={{ rows: 3 }} />
            <Skeleton className="mb-2"  avatar paragraph={{ rows: 3 }} />
            <Skeleton className="mb-2"  avatar paragraph={{ rows: 3 }} />
            <Skeleton className="mb-2"  avatar paragraph={{ rows: 3 }} />
            <Skeleton className="mb-2"  avatar paragraph={{ rows: 3 }} />
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
