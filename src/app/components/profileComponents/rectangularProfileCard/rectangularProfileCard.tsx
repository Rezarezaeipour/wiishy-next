import { Avatar, Button, SpinLoading } from "antd-mobile";
import "./style.css";
import { useEffect, useState } from "react";
import { Profile } from "next-auth";
import { User } from "@/types";
import Link from "next/link";
import {
  amIfollowHim,
  followUser,
  unFollowUser,
  getMyData,
} from "@/app/api-client/users";

function RectangularProfileCard(props: any) {
  const [newuser, setNewuser] = useState<User>();
  const [isfollow, setIsfollow] = useState(false);
  const [floading, setFloading] = useState(false);

  useEffect(() => {
   
    (async () => {
      const data = await getMyData(0);
     
      setNewuser(data?.users);
    })();
  }, [setNewuser]);

  return (
    <>
      {props && props?.user ? (
        <div className="suggest-card flex flex-col items-center justify-center w-[130px]  ">
          <Link href={`/profile/profile/${props.user.user_id}`}>
            <Avatar
              className="rounded-full"
              src={`https://wiishy-backend.ir/${props.user.user_image_url}`}
              style={{ "--size": "65px" }}
            />
          </Link>
          <div className="flex flex-col w-full">
            <span className="w-full mt-2 people-desc text-black text-sm truncate text-center">
              {props.user.name}
            </span>
            <span className="w-full people-desc text-black text-xs truncate text-center">
              {props.user.family}
            </span>
          </div>

          {isfollow ? (
            <Button
              loading={floading}
              onClick={async (e) => {
                e.stopPropagation();
                setFloading(true);
                const result = await unFollowUser(props.user.user_id);
                result.status == "success"
                  ? setIsfollow(false)
                  : setIsfollow(true);
                setFloading(false);
              }}
              className="btn btn-regular-outline-small mt-3"
            >
              Unfollow
            </Button>
          ) : (
            <Button
              loading={floading}
              onClick={async (e) => {
                e.stopPropagation();
                setFloading(true);
                const result = await followUser(props.user.user_id);
                result.status == "success"
                  ? setIsfollow(true)
                  : setIsfollow(false);
                setFloading(false);
              }}
              className="btn btn-regular-outline-small mt-3"
            >
              Follow
            </Button>
          )}
        </div>
      ) : (
        <div className="suggest-card  flex flex-row align-middle justify-center">
          <SpinLoading color="black" style={{ "--size": "24px" }} />
        </div>
      )}
    </>
  );
}

export default RectangularProfileCard;
