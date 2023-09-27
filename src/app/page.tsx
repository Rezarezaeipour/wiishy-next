'use client'
import Image from 'next/image'
import { Button, ConfigProvider } from 'antd';
import theme from '../../theme/themeConfig';
import { useSession } from 'next-auth/react';

export default function Home() {
  const { data: session, status } = useSession();
  console.log(session)

  return (
    <>

      <div className="App">

        <div>
          {status}{' '}
          {status === 'authenticated' && session?.user?.image && session?.user?.name && (

            <>
              <br />
              <p>{session?.user?.name}</p>
              <br />
              <p>{session?.user?.email}</p>
              <br />
              <img height={100} src={session.user.image} />
              <br />
            </>
          )}
        </div>
      </div>
    </>

  )
}
