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

export default function ProfileWrapper(props: { id: number }) {
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
  const [loading, setLoading] = useState(false);

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
        <div className="flex flex-col items-center pt-5">
          <Image
            width={150}
            height={150}
            alt={newuser.name}
            src={`https://wiishy-backend.ir${newuser.user_image_url}`}
            className="rounded-full w-1/3 "
            style={{
              width: "150px",
              height: "150px",
              objectFit: "cover",
              border: "solid 2px white",
            }}
            fit="cover"
          />

          <h1 className="font-bold text-xl mt-1.5">
            {newuser.name || "Name"} {newuser.family || "Family"}
          </h1>
          <div className="flex flex-row mt-0">
            <p> {newuser.age ? newuser.age.toString() + " years old" : ""} </p>
          </div>
          <h2 className="mt-0">
            (
            {newuser.user_gender ? (() => {
              
              switch (newuser.user_gender.toString()) {
                case "1":
                  return "Man";
                case "2":
                  return "Woman";
                case "3":
                  return "Unknown";
              } 
            })() :  "Unknown"}
            )
          </h2>
          {/* <div className="flex flex-row mt-1">
            <LocationFill className="mt-0.5 mr-1" />
            <p>{"Berlin | Gernmany"}</p>
          </div> */}
          <div className="flex flex-row gap-3 mt-1 mb-2">
            <Link href={`/profile/followings/${props.id}/${newuser.name}`}>
              <div className="flex flex-row items-center align-middle">
                <p className="font-bold mr-1">{followings}</p>
                <p className="font-light">following</p>
              </div>
            </Link>
            <Link href={`/profile/followers/${props.id}/${newuser.name}`}>
              <div className="flex flex-row items-center">
                <p className="font-bold mr-1">{followers}</p>
                <p className="font-light">followers</p>
              </div>
            </Link>
          </div>
          <p className="px-4 py-1">
            { (newuser?.user_desc && newuser?.user_desc!='null')  ? newuser?.user_desc : "  "}
          </p>
          <div className="flex flex-row mt-0">
            {isfollow ? (
              <div className="flex flex-col">
               
                <Button
                  loading={loading}
                  onClick={async () => {
                    setLoading(true);
                    const result = await unFollowUser(props.id);
                    result.status == "success"
                      ? setIsfollow(false)
                      : setIsfollow(true);
                    setFollowers((old) => old - 1);
                    setLoading(false);
                  }}
                  className="adm-button adm-button-default adm-button-shape-default btn btn-regular-outline-small"
                >
                  Unfollow
                </Button>
                <p  className="text-xs mt-1">Youre following</p>
              </div>
            ) : (
              <div className="flex flex-col">
                
                <Button
                  loading={loading}
                  onClick={async () => {
                    setLoading(true);
                    const result = await followUser(props.id);
                    result.status == "success"
                      ? setIsfollow(true)
                      : setIsfollow(false);
                    setFollowers((old) => old + 1);
                    setLoading(false);
                  }}
                  className=" adm-button adm-button-default adm-button-shape-default btn btn-regular-outline-small"
                >
                  Follow
                </Button>
                <p className="text-xs mt-1">Follow to learn more...</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
