"use client";
import MyProductList from "@/app/components/myProductList/myProductList";
import { useEffect, useState } from "react";
import { myProductListHandler } from "@/app/api-client/gifts";
import { Skeleton } from "antd";
import ProfileWrapper from "@/app/components/profileWrapper/profileWrapper";
import getUserData from "@/app/api-client/users";


function Profile({params} : {params : {userid : number}}) {

    const [newuser, setNewuser] = useState<{
      name: string;
      family: string;
      user_gender: string;
      followings: number;
      followers: number;
      user_desc: string;
      user_image_url: string;
    }>();
  
    useEffect(() => {
      (async () => {
        const data = await getUserData(params.userid);
        console.log(JSON.stringify(data))
        setNewuser(data.user);
      })();
    }, [setNewuser]);
  
    return (
        <>
        <div className="py-5 px-2">
          {!newuser ? (
            <div className="flex flex-col items-center">
              <Skeleton.Avatar active={true} size={150} shape={"circle"} />
              <Skeleton
                paragraph={{ rows: 5 }}
                active
                className="mt-3 text-center"
              />
            </div>
          ) : (
            <ProfileWrapper
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
            />
          )}
  
         
        </div>
      </>
    )
}

export default Profile;