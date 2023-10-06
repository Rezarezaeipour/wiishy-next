"use client";
import { Image, List, Switch } from "antd-mobile";
import {
  PayCircleOutline,
  SetOutline,
  UnorderedListOutline,
} from "antd-mobile-icons";
import "./style.css";
import ProfileCard from "../profileCard/profileCard";
import { signOut, useSession } from "next-auth/react";
import { BulbOutlined, FireOutlined } from "@ant-design/icons";
import { useLoginContext } from "@/app/context/loginContext";
import { useRouter } from "next/navigation";

function SideMenu() {
  const { data: session, status } = useSession();
  const { logOut } = useLoginContext();
  const router = useRouter();
  return (
    <>
      {session ?
      <div className="sidemenu-container">
        <div className="sidemenu-header">
          <Image alt="Wiishy" src="/wisshy.png" width={100} />
          <p className="pl-4">An ultimate wishlist</p>
        </div>

        <ProfileCard
          avatar={session?.user?.image || "/wiishy.png"}
          name={session?.user?.name || "Wiishy user"}
        />

        <List header="Menu" className="mt-5">
          <List.Item
            className="text-xs"
            prefix={<UnorderedListOutline />}
            onClick={() => {}}
          >
            Home
          </List.Item>
          <List.Item
            className="text-xs"
            prefix={<PayCircleOutline />}
            onClick={() => {}}
          >
            Event
          </List.Item>
          <List.Item
            className="text-xs"
            prefix={<SetOutline />}
            onClick={() => {}}
          >
            Search
          </List.Item>
          <List.Item
            className="text-xs"
            prefix={<SetOutline />}
            onClick={() => {}}
          >
            Followers
          </List.Item>
          <List.Item
            className="text-xs"
            prefix={<SetOutline />}
            onClick={() => {}}
          >
            Followings
          </List.Item>
        </List>

        <List header="Setting" className="mt-5" style={{ fontSize: "13px" }}>
          <List.Item
            className="text-xs"
            extra={
              <Switch
                checkedText={<FireOutlined fontSize={15} />}
                uncheckedText={<BulbOutlined fontSize={15} />}
              />
            }
          >
            Dark mode
          </List.Item>
          <List.Item
            className="text-xs"
            onClick={() => {
              logOut();
              signOut({ callbackUrl: "/login" });
            }}
          >
            Log Out
          </List.Item>
        </List>
      </div> : router.push('/login')}
    </>
  );
}

export default SideMenu;
