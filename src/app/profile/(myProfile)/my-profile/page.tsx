"use client";
import MyProductList from "@/app/components/myProductList/myProductList";
import MyProfileWrapper from "@/app/components/myProfileWrapper/myProfileWrapper";
import myProductListHandler from "@/app/handlers/myProductListHandler";
import { useEffect, useState } from "react";

function MyProfile() {
  const [productList,setProductList] = useState();
  
  useEffect(() => {
    (async () => {
        const ProductList = await myProductListHandler();
        setProductList(ProductList.gifts);
    })()
  }, []);

  return (
    <>
      <div className="py-5 px-2">
        <MyProfileWrapper
          image=""
          name="REZA"
          gender="man"
          location=""
          following="11"
          followers="22"
          bio=""
        />
        <div className="grid grid-cols-2 gap-0 mt-7 mb-10 border-cyan-700">
        
          {productList ? 
            <MyProductList productList={productList} />
           : 
            "You haven't add any gift"
          }
        </div>
      </div>
    </>
  );
}

export default MyProfile;
