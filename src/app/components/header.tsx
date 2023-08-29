"use client";

import React, { useState } from "react";
import { NavBar, Space, Toast, Popup } from "antd-mobile";
import { SearchOutline, MoreOutline } from "antd-mobile-icons";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import Image from 'next/image'
import useToggle from "../hooks/useToggle";
import SideMenu from "./sideMenu/sideMenu";

export default function Header() {
  const [popupVisible, togglePopup] = useToggle();


  const backIcon = popupVisible ? <CloseOutlined/> : <MenuOutlined />

  return (
    <>
      <NavBar back={backIcon} onBack={togglePopup} backArrow={false} 
      style={{backgroundColor: 'white'}}>
        <Image
          src='/wisshy.png'
          width={96}
          height={37}
          alt='wishy logo'
        />
      </NavBar>
      <div style={{ position: "relative" }}>
        <Popup
          mask={true}
          maskClassName="mt-45px"
          bodyClassName="mt-45px"
          visible={popupVisible}
          onMaskClick={() => {
            togglePopup();
          }}
          position="left"
          bodyStyle={{ width: "70vw" }}
        >
          <SideMenu/>
        </Popup>
      </div>
    </>
  );
};
