"use client";
import { Event, User } from "@/types";
import { getMyEventList } from "@/app/api-client/events";
import { useEffect, useState } from "react";
import Loading from "@/app/loading";
import HorizontalProfileCardFollowing from "../horizontalProfileCardFollowing/horizontalProfileCardFollowing";
import { getFollowings } from "@/app/api-client/users";


function FollowingList(props: { userId: number }) {
  const [followingsList, setFollowingsList] =
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
      const response = await getFollowings(props.userId);
   
      setFollowingsList(response.followings);
    })();
  }, [props.userId]);

  return (
    <div className="h-full w-full">
      {followingsList && followingsList.length > 0 ? (
        followingsList.map((item, index) => {
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

export default FollowingList;
