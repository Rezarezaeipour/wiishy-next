"use client";
import MyProductList from "@/app/components/myProductList/myProductList";
import MyProfileWrapper from "@/app/components/myProfileWrapper/myProfileWrapper";
import myProductListHandler from "@/app/handlers/myProductListHandler";
import { useEffect, useState } from "react";
import getLoadInfo from "../../../hooks/useLoadInfo";

function MyProfile() {
  const [productList,setProductList] = useState();
  const [newuser,setNewuser] = useState<{name:string,family:string,user_gender:string,followings:number,followers:number,user_desc:string,user_image_url:string}>();
  
  useEffect(() => {
    (async () => {
        const ProductList = await myProductListHandler();
        setProductList(ProductList.gifts);

        const data = await getLoadInfo();
        setNewuser(data.user);
        console.log('data',data.user);
    })()
  }, []);

  return (
    <>
      <div className="py-5 px-2">
        <MyProfileWrapper
          image={(newuser && newuser.user_image_url) ? newuser?.user_image_url : '/wiishy'} 
          name={(newuser && newuser.name) ? newuser?.name : 'Name'}
          family={(newuser && newuser.family) ? newuser?.family : 'Family'}
          gender={(newuser && newuser.user_gender) ? newuser?.user_gender : 'Gender'}
          location=""
          followings={newuser?.followings}
          followers={newuser?.followers}
          bio={(newuser && newuser.user_desc) ? newuser?.user_desc : '...'}
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
