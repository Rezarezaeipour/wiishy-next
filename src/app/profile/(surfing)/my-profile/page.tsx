"use client";

import MyProfileWrapper from "@/app/components/profileComponents/myProfileWrapper/myProfileWrapper";
import { useEffect, useRef, useState } from "react";
import { Skeleton } from "antd";
import { getMyData } from "@/app/api-client/users";
import ProductEventContainer from "@/app/components/profileComponents/productEventcontainer/productEventContainer";
import { useSearchParams } from 'next/navigation'
import Link from "next/link";

function MyProfile() {
  const [newuser, setNewuser] = useState<{
    id: number;
    name: string;
    family: string;
    user_gender: string;
    followings: number;
    followers: number;
    user_desc: string;
    user_image_url: string;
    age: string;
  }>();

  const [defaulttab,setDefaulttab] = useState<any>();
  const searchParams = useSearchParams();
  
  useEffect(() => {
    (async () => {
      // const element = document.getElementById("second");    
      // element?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
      setDefaulttab(searchParams.get('e'));
      const data = await getMyData(0);
      setNewuser(data.users);
    
    })();
  }, [setNewuser,searchParams]);

  return (
    <>
      
      <div  className="py-5 px-2">
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
            age={newuser && newuser.age ? newuser?.age+ " years old " : ""}
          />
        )}

        <div className="mt-7">
          {/* <a href="second" id="second"/> */}
          <ProductEventContainer  defaultTab={defaulttab} />
        </div>
        
      </div>
    </>
  );
}

export default MyProfile;
