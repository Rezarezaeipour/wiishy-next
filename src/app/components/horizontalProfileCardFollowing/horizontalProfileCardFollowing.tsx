import { List, Avatar, Button, SpinLoading } from "antd-mobile";
import "./style.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  amIfollowHim,
  followUser,
  getMyData,
  unFollowUser,
} from "@/app/api-client/users";
import { Profile } from "next-auth";
import { User } from "@/types";
import Link from "next/link";

 function HorizontalProfileCardFollowing(props: {
  user_id: number;
  user_image_url: string;
  name: string;
  family: string;
  user_status?: number;
}) {
  const [isfollow, setIsfollow] = useState(true);
  const [amIFollow, setAmIFollow] = useState(false);

  // useEffect(() => {
  //   (async () => {
  //     const res = await amIfollowHim(props.user_id);
  //     setAmIFollow(res.isfollow);
  //   })();
  // }, []);
  return (
    <>
      <div className="flex flex-row mt-2 mb-3 p-2 pb-0 items-center justify-between">
        <Link className="text-black" href="#">
          <div className="flex flex-row items-center justify-start">
            <Avatar
              src={`https://wiishy-backend.ir/${props.user_image_url}`}
              style={{ "--size": "50px", "--border-radius": "50px" }}
            />
            <div>
              <p className="text-l font-normal ml-2">
                {props.name} {props.family}
              </p>
              <p className="text-sm font-thin ml-2">30 years old | Berlin</p>
            </div>
          </div>
        </Link>
        <div>
          {amIFollow ? (
            <Button
              onClick={async () => {
                const result = await unFollowUser(props.user_id);
                result.status == "success"
                  ? setIsfollow(false)
                  : setIsfollow(true);
              }}
              className="btn btn-regular-outline"
            >
              Unfollow
            </Button>
          ) : (
            <Button
              onClick={async () => {
                const result = await followUser(props.user_id);
                result.status == "success"
                  ? setIsfollow(true)
                  : setIsfollow(false);
              }}
              className="btn btn-regular-outline"
            >
              Follow
            </Button>
          )}
        </div>
      </div>
    </>
  );
}

export default HorizontalProfileCardFollowing;
