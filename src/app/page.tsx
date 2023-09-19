'use client'
import Image from 'next/image'
import { Button, ConfigProvider } from 'antd';
import theme from '../../theme/themeConfig';
import { useSession } from 'next-auth/react';

export default function Home() {
  const { data: session, status } = useSession();
  return (
    <>

      <div className="App">

        <div>
          ClientComponent {status}{' '}
          {status === 'authenticated' && session.user?.name}
        </div>

      </div>

    </>

  )
}
