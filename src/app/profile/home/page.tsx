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

      setCount(res.followings_gifts_count);
      setGiftlist(res.followings_gifts);
    })();
  }, []);

  return (
    <>
      <div className="py-5 px-2 w-full h-screen">
        <h1 className="main-head">Home</h1>
        <h4>Here you can find all the gifts, people you are following wish to have. Wiishy AI agent, will add 
          some gifts you may wish to have or some idea that you should have desired to know to buy for yourself or your family and friends.
        </h4>
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
