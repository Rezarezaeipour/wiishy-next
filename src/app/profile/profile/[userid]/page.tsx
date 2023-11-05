"use client";
import MyProductList from "@/app/components/myProductList/myProductList";
import { Skeleton } from "antd";
import ProfileWrapper from "@/app/components/profileWrapper/profileWrapper";

function Profile({params} : {params : {userid : number}}) {
  
    return (
        <>
        <div className="py-5 px-2">
          {/* {!newuser ? (
            <div className="flex flex-col items-center">
              <Skeleton.Avatar active={true} size={150} shape={"circle"} />
              <br />
              <Skeleton
                paragraph={{ rows: 5 }}
                active
                className="mt-4 text-center"
              />
            </div>
          ) : ( */}
            <ProfileWrapper id = {params && params.userid ? params.userid : 0} />
          {/* )} */}
        </div>
      </>
    )
}

export default Profile;