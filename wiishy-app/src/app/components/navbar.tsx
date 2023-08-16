"use client"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import React from "react";
import StyledComponentsRegistry from '../../../lib/AntdRegistry';
import '../globals.css';
import { Badge, TabBar } from 'antd-mobile';
import {
  HomeOutlined, MessageOutlined, PlusCircleFilled, PlusOutlined, SearchOutlined, UserOutlined,
  
} from '@ant-design/icons'

 export default function Navbar() {
    const tabs = [
        {
          key: 'Home',
          title: 'Home',
          icon: <HomeOutlined/>,
          badge: Badge.dot,
        },
        {
          key: 'Search',
          title: 'Search',
          icon: <SearchOutlined/> ,
        },
        {
          key: 'message',
          title: 'Add',
          icon: (active: boolean) =>
            active ? <PlusOutlined /> : <PlusCircleFilled />,
        },
        {
          key: 'Events',
          title: 'Events',
          icon: <MessageOutlined />,
          badge: '5',
        },
        {
          key: 'Profile',
          title: 'Profile',
          icon: <UserOutlined />,
        }
        
      ]

    return ( 
        <TabBar className='navbar-light'>
        {tabs.map(item => (
          <TabBar.Item
            key={item.key}
            icon={item.icon}
            title={item.title}
            badge={item.badge}
          />
        ))}
      </TabBar>
     );
}




