"use client"
import Image from 'next/image'
import { Button, ConfigProvider } from 'antd';
import theme from '../../theme/themeConfig';

export default function Home() {
  return (
    <>
      <ConfigProvider theme={theme}>
        <div className="App">
         
         
        </div>
      </ConfigProvider>
    </>

  )
}
