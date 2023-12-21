"use client";
import getUserData, {
  amIfollowHim,
  followUser,
  unFollowUser,
} from "@/app/api-client/users";
import { Skeleton } from "antd";
import { Button, Image } from "antd-mobile";
import { LocationFill } from "antd-mobile-icons";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ProfileWrapperLittle(props: { id: number }) {
  const [newuser, setNewuser] = useState<{
    id: number;
    name: string;
    family: string;
    user_gender: string;
    followings: number;
    followers: number;
    user_desc: string;
    user_image_url: string;
    age?: string;
  }>();

  const [isfollow, setIsfollow] = useState(false);
  const [followers, setFollowers] = useState<number>(0);
  const [followings, setFollowings] = useState<number>(0);

  useEffect(() => {
    (async () => {
      const data = await getUserData(props.id);

      setNewuser(data.users);
      setFollowings(parseInt(data.users.followings));
      setFollowers(parseInt(data.users.followers));
    })();
  }, [props.id]);

  useEffect(() => {
    (async () => {
      const response = await amIfollowHim(props.id);
      response.isfollow ? setIsfollow(true) : setIsfollow(false);
    })();
  }, [setIsfollow, props.id]);

  return (
    <>
      {!newuser ? (
        <div className="flex flex-col items-center">
          <Skeleton.Avatar active={true} size={150} shape={"circle"} />
          <br />
          <Skeleton
            paragraph={{ rows: 5 }}
            active
            className="mt-4 text-center"
          />
        </div>
      ) : (
        <div className="flex flex-row pt-0 mx-3">
          <div className=" basis-1/4" >
            <Image
              width={100}
              height={100}
              alt={newuser.name}
              src={`https://wiishy-backend.ir${newuser.user_image_url}`}
              className="rounded-full "
              style={{
                width: "100px !important",
                height: "100px !important",
                objectFit: "cover",
                border: "solid 2px white",
              }}
              fit="cover"
            />
          </div>
          <div className="flex flex-col  justify-center basis-3/4 px-3">
            <h1 className="font-bold text-xl mt-3">
              {newuser.name || "Name"} {newuser.family || "Family"}
            </h1>
            <div className="flex flex-row mt-1">
              <p>
                {" "}
                {newuser.age ? newuser.age.toString() + " years old" : ""}{" "} (
              {(() => {
                switch (newuser.user_gender.toString()) {
                  case "1":
                    return "Man";
                  case "2":
                    return "Woman";
                  case "3":
                    return "Unknown";
                }
              })()}
              )
              </p>
            </div>
            {/* <div className="flex flex-row items-start gap-4 mt-0 mb-2">
              <Link href={`/profile/followings/${props.id}/${newuser.name}`}>
                <div className="flex flex-row items-start align-middle">
                  <p className="font-bold mr-1">{followings}</p>
                  <p>following</p>
                </div>
              </Link>
              <Link href={`/profile/followers/${props.id}/${newuser.name}`}>
                <div className="flex flex-row items-start">
                  <p className="font-bold mr-1">{followers}</p>
                  <p>followers</p>
                </div>
              </Link>
            </div> */}
          </div>
        </div>
      )}
    </>
  );
}
