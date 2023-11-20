import { List, Avatar, Button, SpinLoading } from "antd-mobile";
import "./style.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getMyData } from "@/app/api-client/users";
import { Profile } from "next-auth";
import { User } from "@/types";
import Link from "next/link";

function HorizontalProfileCard() {
  const [newuser, setNewuser] = useState<User>();
  useEffect(() => {
    (async () => {
      const data = await getMyData(0);
      console.log("xxx",data );
      setNewuser(data?.users);
    })();
  }, [setNewuser]);
  return (
    <>
      {newuser && newuser?.user_image_url ? (
        <Link href={`/profile/my-profile`} >
        <List>
          <List.Item
            className="people-name"
            prefix={
              <Avatar
                style={{ "--border-radius": "20px" }}
                src={`https://wiishy-backend.ir/${newuser.user_image_url}`}
              />
            }
            description={`${
              newuser.age ? newuser.age : "??"
            } years old `}
          >
            <span className="people-desc text-black">
              {newuser.name ? newuser.name : "---"}{" "}
              {newuser.family ? newuser.family : "---"}
            </span>
          </List.Item>
        </List>
        </Link>
      ) : (
        <div className="flex flex-row align-middle justify-center">
          <SpinLoading color="black" style={{ "--size": "24px" }} />
        </div>
      )}
    </>
  );
}

export default HorizontalProfileCard;
