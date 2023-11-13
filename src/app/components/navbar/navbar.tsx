"use client"

import React from "react";
import '@/app/globals.css';
import { Badge, TabBar } from 'antd-mobile';
import { usePathname, useRouter } from 'next/navigation';
import {
  HomeOutlined, MessageOutlined, PlusCircleFilled, PlusOutlined, SearchOutlined, UserOutlined,
  
} from '@ant-design/icons'

 export default function Navbar() {
  const router = useRouter();
  const setRouteActive = (value: string) => {
    router.push(value);
  }
    const tabs = [
        {
          key: '/profile/home',
          title: 'Home',
          icon: <HomeOutlined className="mb-2"/>,
          // badge: Badge.dot,
          onclick : setRouteActive('/profile/home')
        },
        {
          key: '/profile/search',
          title: 'Search',
          icon: <SearchOutlined/> ,
        },
        {
          key: '/profile/new-gift',
          title: 'Add',
          icon: (active: boolean) =>
            active ? <PlusOutlined /> : <PlusCircleFilled />,
        },
        {
          key: '/profile/events',
          title: 'Events',
          icon: <MessageOutlined />,
          // badge: '5',
        },
        {
          key: '/profile/my-profile',
          title: 'Profile',
          icon: <UserOutlined />,
        }
        
      ]

    return ( 
        <TabBar className='navbar-light' onChange={value=>setRouteActive(value)}>
        {tabs.map(item => (
          <TabBar.Item
            key={item.key}
            icon={item.icon}
            title={item.title}
            // badge={item.badge}  
          
          />
        ))}
      </TabBar>
     );
}




