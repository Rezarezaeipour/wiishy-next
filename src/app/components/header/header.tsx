"use client";

import React, { useState } from "react";
import { NavBar, Space, Toast, Popup } from "antd-mobile";
import { SearchOutline, MoreOutline } from "antd-mobile-icons";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import Image from "next/image";
import useToggle from "../../hooks/useToggle";
import SideMenu from "../sideMenu/sideMenu";
import logo from "../../../../public/logo/wiishy-little.png";

export default function Header() {
  const [popupVisible, togglePopup] = useToggle();

  const backIcon = popupVisible ? <CloseOutlined /> : <MenuOutlined />;

  return (
    <>
      <NavBar
        back={backIcon}
        onBack={togglePopup}
        backArrow={false}
        style={{ backgroundColor: "white"}}
      >
        <Image src={logo} width={96} height={37} alt="wishy logo" className="mx-auto" />
      </NavBar>

      <div style={{ position: "relative" }}>
        <Popup
          mask={true}
          maskClassName="mt-45px"
          bodyClassName="mt-45px"
          visible={popupVisible}
          onClick={()=>{
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
