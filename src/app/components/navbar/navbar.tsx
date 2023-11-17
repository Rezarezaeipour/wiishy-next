"use client";

import React from "react";
import "@/app/globals.css";
import { Badge, TabBar } from "antd-mobile";
import { usePathname, useRouter } from "next/navigation";
import {
  HomeOutlined,
  LeftOutlined,
  MessageOutlined,
  PlusCircleFilled,
  PlusOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Link from "next/link";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="adm-tab-bar navbar-light flex flex-row justify-between py-3 px-2">
      <div>
        <Link
          className={`flex flex-col nbutton ${
            pathname === "/profile/home" ? "nbutton-active" : ""
          }`}
          href={"/profile/home"}
        >
          <HomeOutlined className="nicon mb-2" />
          <p className="ntext">Home</p>
        </Link>
      </div>
      <div>
        <Link
          className={`flex flex-col nbutton ${
            pathname === "/profile/search" ? "nbutton-active" : ""
          }`}
          href={"/profile/search"}
        >
          <SearchOutlined className="nicon mb-2" />
          <p className="ntext">Search</p>
        </Link>
      </div>
      <div>
        <Link
          className={`flex flex-col nbutton ${
            pathname === "/profile/search" ? "nbutton-active" : ""
          }`}
          href={"/profile/search"}
        >
          <PlusOutlined className="nicon mb-2" />
          <p className="ntext">New gift</p>
        </Link>
      </div>
      <div>
        <Link
          className={`flex flex-col nbutton ${
            pathname === "/profile/events" ? "nbutton-active" : ""
          }`}
          href={"/profile/events"}
        >
          <MessageOutlined className="nicon mb-2" />
          <p className="ntext">Events</p>
        </Link>
      </div>
      <div>
        <Link
          className={`flex flex-col nbutton ${
            pathname === "/profile/my-profile/" ? "nbutton-active" : ""
          }`}
          href={"/profile/my-profile"}
        >
          <UserOutlined className="nicon mb-2" />
          <p className="ntext">Profile</p>
        </Link>
      </div>
      <div>
        <div className="flex flex-col nbutton" onClick={()=>{router.back()}}>
          <LeftOutlined className="nicon mb-2" />
          <p className="ntext">Back</p>
        </div>
      </div>
    </div>
  );
}
