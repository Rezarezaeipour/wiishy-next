"use client";
import { loadMyFollowingProductlist } from "@/app/api-client/gifts";
import ProductList from "@/app/components/productList/productList";
import { useEffect, useState } from "react";

async function Home() {
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
      <div
        className="py-5 px-2 w-full h-screen"
      >
        <h1 className="main-head">Home</h1>

        {count > 0 && giftlist ? (
          <div className="grid grid-cols-2 gap-0 mt-7 mb-10 ">
            <ProductList productList={giftlist} />
          </div>
        ) : (
          <div className="flex items-center justify-center h-screen mt-[-100px]">
            <p>There is nothing to show!</p>
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
