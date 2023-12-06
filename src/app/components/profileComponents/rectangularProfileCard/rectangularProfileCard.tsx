
import { Avatar, SpinLoading } from "antd-mobile";
import "./style.css";
import { useEffect, useState } from "react";
import { followUser, getMyData } from "@/app/api-client/users";
import { Profile } from "next-auth";
import { User } from "@/types";
import Link from "next/link";

function RectangularProfileCard(props : any) {

  const [newuser, setNewuser] = useState<User>();
  useEffect(() => {
    (async () => {
      const data = await getMyData(0);
      setNewuser(data?.users);
    })();
  }, [setNewuser]);

  return (
    <>

      {newuser && newuser?.user_image_url ? (

        <Link href={`/profile/profile/${props.user.id}`}>
          <div className="suggest-card flex flex-col items-center justify-center">
            <Avatar
              className="rounded-full"
              src={`https://wiishy-backend.ir/${props.user.user_image_url}`}
              style={{ "--size": "65px" }}
            />
            <span className="mt-2 people-desc text-black text-sm">
              {props.user.name}
            </span>
            <span className="people-desc text-black text-xs">
              {props.user.family}
            </span>
            <button onClick={()=>{followUser(props.user.id)}} style={{fontSize:'10px'}} className="text-[10px] btn-regular btn-regular-outline mt-3 px-2" >
              Follow
            </button>
          </div>
        </Link>

      ) : (

        <div className="flex flex-row align-middle justify-center">
          <SpinLoading color="black" style={{ "--size": "24px" }} />
        </div>

      )}
    </>
  );
}

export default RectangularProfileCard;
