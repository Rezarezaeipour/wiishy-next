"use client";
import { useEffect, useState } from "react";
import HorizontalProfileCardFollowing from "../horizontalProfileCardFollowing/horizontalProfileCardFollowing";
import { getFollowers } from "@/app/api-client/users";


function FollowerList(props: { userId: number }) {
  const [followerList, setFollowerList] =
    useState<
      [
        {
          user_id: number;
          user_image_url: string;
          name: string;
          family: string;
          user_status?: number;
        }
      ]
    >();

  useEffect(() => {
    (async () => {
      const response = await getFollowers(props.userId);
     
      setFollowerList(response.followers);
    })();
  }, [props.userId]);

  return (
    <div className="h-full w-full">
      {followerList && followerList.length > 0 ? (
        followerList.map((item, index) => {
          return <HorizontalProfileCardFollowing key={`p-${item.user_id}`} user_id={item.user_id} name={item.name} family={item.family} user_image_url={item.user_image_url}/>;
        })
      ) : (
        <div className="mt-3">
          <p className="text-center">No records</p> 
        </div> 
      )}
    </div>
  );
}

export default FollowerList;
