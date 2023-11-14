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
  }>();

  const [isfollow, setIsfollow] = useState(false);
  const [followers, setFollowers] = useState(0);
  const [followings, setFollowings] = useState(0);

  useEffect(() => {
    (async () => {
      const data = await getUserData(props.id);

      setNewuser(data.users);
      setFollowings(data.users.followings);
      setFollowers(data.users.followers);
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
          />

          <h1 className="font-bold text-xl mt-3">
            {newuser.name || "Name"} {newuser.family || "Family"}
          </h1>
          <h2 className="mt-1">
            (
            {(() => {
              switch (newuser.user_gender.toString()) {
                case "1":
                  return "Man";
                case "2":
                  return "Woman";
                default:
                  return "Unknown";
              }
            })()}
            )
          </h2>
          <div className="flex flex-row mt-1">
            <LocationFill className="mt-0.5 mr-1" />
            <p>{"Berlin | Gernmany"}</p>
          </div>
          <div className="flex flex-row gap-4 mt-2 mb-2">
            <Link href={`/profile/followings/${props.id}/${newuser.name}`}>
              <div className="flex flex-col items-center align-middle">
                <p className="font-bold">{followings}</p>
                <p>following</p>
              </div>
            </Link>
            <Link href={`/profile/followers/${props.id}/${newuser.name}`}>
              <div className="flex flex-col items-center">
                <p className="font-bold">{followers}</p>
                <p>followers</p>
              </div>
            </Link>
          </div>
          <p className="px-4 py-1">
            {newuser?.user_desc ||
              " A passionate web developer and designer looking for new opportunities in European "}
          </p>
          <div className="flex flex-row gap-2 mt-2.5">
            {isfollow ? (
              <div className="flex flex-col">
                <p>Youre following</p>
                <Button
                  onClick={async () => {
                    const result = await unFollowUser(props.id);

                    result.status == "success"
                      ? setIsfollow(false)
                      : setIsfollow(true);
                    setFollowers((old) => old - 1);
                  }}
                  color="default"
                  fill="outline"
                  size="mini"
                >
                  Unfollow
                </Button>
              </div>
            ) : (
              <div className="flex flex-col">
                <p>Follow to learn more...</p>
                <Button
                  onClick={async () => {
                    const result = await followUser(props.id);
                    result.status == "success"
                      ? setIsfollow(true)
                      : setIsfollow(false);
                    setFollowers((old) => old + 1);
                  }}
                  color="default"
                  fill="outline"
                  size="mini"
                >
                  Follow
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
