"use client";
import { List, Switch } from "antd-mobile";
import {
  PayCircleOutline,
  SetOutline,
  UnorderedListOutline,
} from "antd-mobile-icons";
import "./style.css";
import Image from "next/image";
import ProfileCard from "../profileCard/profileCard";
import { useSession } from "next-auth/react";
import {
  BulbOutlined,
  CalendarOutlined,
  FireOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
  HomeOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useLoginContext } from "@/app/context/loginContext";
import logo from "../../../../public/logo/wiishy-little.png";

function SideMenu() {
  const { data: session, status } = useSession();
  const { logOut } = useLoginContext();
  const router = useRouter();

  return (
    <>
      {session ? (
        <div className="sidemenu-container">
          <div className="sidemenu-header w-full flex justify-center py-6">
            <Image
              alt="Wiishy"
              src={logo}
              width={100}
              style={{ width: "70%" }}
            />
          </div>

          <ProfileCard
            avatar={session?.user?.image || "/wiishy.png"}
            name={session?.user?.name || "Wiishy user"}
          />

          <List header="Menu" className="mt-5">
            <List.Item
              className="text-xs"
              onClick={() => {}}
            >
              <div className="flex align-middle">
              <HomeOutlined className="mr-2 pt-0.5"/>Home</div>
            </List.Item>
            <List.Item className="text-xs" onClick={() => {}}>
              <div className="flex align-middle">
                <CalendarOutlined className="mr-2 pt-0.5" />
                Event
              </div>
            </List.Item>
            <List.Item className="text-xs" onClick={() => {}}>
              <div className="flex align-middle">
                <SearchOutlined className="mr-2 pt-0.5" />
                Search
              </div>
            </List.Item>
            <List.Item className="text-xs" onClick={() => {}}>
              <div className="flex align-middle">
                <FullscreenExitOutlined className="mr-2 pt-0.5" />
                Followers
              </div>
            </List.Item>
            <List.Item className="text-xs" onClick={() => {}}>
              <div className="flex align-middle">
                <FullscreenOutlined className="mr-2 pt-0.5" />
                Followings
              </div>
            </List.Item>
          </List>

          <List header="Setting" className="mt-5" style={{ fontSize: "13px" }}>
            <List.Item
              className="text-xs"
              extra={
                <Switch
                  checkedText={<FireOutlined style={{ fontSize: "15px" }} />}
                  uncheckedText={<BulbOutlined style={{ fontSize: "15px" }} />}
                />
              }
            >
              Dark mode
            </List.Item>
            <List.Item
              className="text-xs"
              onClick={() => {
                logOut();
              }}
            >
              Log Out
            </List.Item>
          </List>
        </div>
      ) : (
        router.push("/login")
      )}
    </>
  );
}

export default SideMenu;
