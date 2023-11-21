"use client";

import MyProfileWrapper from "@/app/components/profileComponents/myProfileWrapper/myProfileWrapper";

import { useEffect, useRef, useState } from "react";
import { Skeleton } from "antd";
import { getMyData } from "@/app/api-client/users";
import { chatting } from "@/app/api-client/ai";
import ProductEventContainer from "@/app/components/profileComponents/productEventcontainer/productEventContainer";

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

  useEffect(() => {
    (async () => {
      // Temp ChatGpt API
      const xx = await chatting();
      const data = await getMyData(0);
      setNewuser(data.users);
      console.log("data",data);
    })();
  }, [setNewuser]);

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
            age={newuser && newuser.age ? newuser?.age+ " years old " : ""}
          />
        )}

        <div className="mt-7">
          <ProductEventContainer />
        </div>
      </div>
    </>
  );
}

export default MyProfile;
