"use client";

import React from "react";
import { NavBar, Space, Toast, Popup } from "antd-mobile";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import Image from "next/image";
import useToggle from "../../../hooks/useToggle";
import SideMenu from "@/app/components/sideMenu/sideMenu";
import wiisylogo from "../../../../../public/logo/wiishy-little.png"
export default function Header() {
  const [popupVisible, togglePopup] = useToggle();

  const backIcon = popupVisible ? <CloseOutlined /> : <MenuOutlined />;

  return (
    <>
      <NavBar
        back={backIcon}
        onBack={togglePopup}
        backArrow={false}
        style={{ backgroundColor: "white" }}
        className="topNav"
      >
        <Image
          src={wiisylogo}
          width={96}
          height={37}
          alt="wiishy"
          className="mx-auto"
          style={{height:'35px',width:'auto'}}
        />
      </NavBar>

      <div style={{ position: "relative" }}>
        <Popup
          mask={true}
          maskClassName="mt-45px"
          bodyClassName="mt-45px"
          visible={popupVisible}
          onClick={() => {
            togglePopup();
          }}
          onMaskClick={() => {
            togglePopup();
          }}
          position="left"
          bodyStyle={{ width: "70vw" }}
        >
          <SideMenu />
        </Popup>
      </div>
    </>
  );
}
