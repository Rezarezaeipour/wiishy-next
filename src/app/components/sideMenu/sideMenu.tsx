"use client";
import { List, Switch } from "antd-mobile";
import "./style.css";
import Image from "next/image";
import { useSession } from "next-auth/react";
import {
  BulbOutlined,
  CalendarOutlined,
  FireOutlined,
  FormOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
  HomeOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useLoginContext } from "@/app/context/loginContext";
import logo from "../../../../public/logo/wiishy-little.png";
import HorizontalProfileCard from "../horizontalProfileCard/horizontalProfileCard";
import Link from "next/link";

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
              style={{ width: "50%" }}
            />
          </div>

          <HorizontalProfileCard />

          <List className="mt-0">
            <List.Item
            
              className="text-xs"
              onClick={() => {
                router.push("/profile/home");
              }}
            >
              <div className="flex align-middle">
                <div className="flex align-middle">
                  <HomeOutlined className="mr-2 pt-0.5" />
                  Home
                </div>
              </div>
            </List.Item>
            <List.Item
              className="text-xs"
              onClick={() => {
                router.push("/profile/explore");
              }}
            >
              <div className="flex align-middle">
                <div className="flex align-middle">
                  <BulbOutlined className="mr-2 pt-0.5" />
                  Explore
                </div>
              </div>
            </List.Item>
            <List.Item
              className="text-xs"
              onClick={() => {
                router.push("/profile/events");
              }}
            >
              <div className="flex align-middle">
                <CalendarOutlined className="mr-2 pt-0.5" />
                Events
              </div>
            </List.Item>
            <List.Item
              className="text-xs"
              onClick={() => {
                router.push("/profile/add-event");
              }}
            >
              <div className="flex align-middle">
                <CalendarOutlined className="mr-2 pt-0.5" />
                Add Event
              </div>
            </List.Item>
            <List.Item
              className="text-xs"
              onClick={() => {
                router.push("/profile/followers");
              }}
            >
              <div className="flex align-middle">
                <FullscreenExitOutlined className="mr-2 pt-0.5" />
                Followers
              </div>
            </List.Item>
            <List.Item
              className="text-xs"
              onClick={() => {
                router.push("/profile/followings");
              }}
            >
              <div className="flex align-middle">
                <FullscreenOutlined className="mr-2 pt-0.5" />
                Followings
              </div>
            </List.Item>
            <List.Item
              className="text-xs"
              onClick={() => {
                router.push("/profile/edit-profile");
              }}
            >
              <div className="flex align-middle">
                <FormOutlined className="mr-2 pt-0.5" />
                Edit profile
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
