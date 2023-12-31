"use client";
import { useEffect, useState } from "react";
import HorizontalProfileCardFollowing from "../profileComponents/horizontalProfileCardFollowing/horizontalProfileCardFollowing";
import { getFollowers } from "@/app/api-client/users";
import { Skeleton } from "antd";

function FollowerList(props: { userId: number }) {
  const [followerList, setFollowerList] = useState<
    [
      {
        user_id: number;
        user_image_url: string;
        name: string;
        family: string;
        user_status?: number;
        isfollow: boolean;
        age:string;
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
    <div className="h-full w-full  pb-12">
      {followerList ? (
        followerList && followerList.length > 0 ? (
          followerList.map((item, index) => {
            return (
              <HorizontalProfileCardFollowing
                key={`p-${item.user_id}`}
                user_id={item.user_id}
                name={item.name}
                family={item.family}
                user_image_url={item.user_image_url}
                isfollow={item.isfollow}
                age={item.age}
              />
            );
          })
        ) : (
          <div className="mt-3">
            <p className="text-center">No record</p>
          </div>
        )
      ) : (
        <div>
          <Skeleton avatar paragraph={{ rows: 2 }} />
          <Skeleton avatar paragraph={{ rows: 2 }} />
          <Skeleton avatar paragraph={{ rows: 2 }} />
          <Skeleton avatar paragraph={{ rows: 2 }} />
          <Skeleton avatar paragraph={{ rows: 2 }} />
          <Skeleton avatar paragraph={{ rows: 2 }} />
          <Skeleton avatar paragraph={{ rows: 2 }} />
        </div>
      )}
    </div>
  );
}

export default FollowerList;
