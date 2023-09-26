'use client'
import { GoogleOutlined, LinkedinOutlined } from '@ant-design/icons'
import { Card } from 'antd'
import { Button } from 'antd-mobile'
import { signIn, signOut } from 'next-auth/react'

export default function Login() {
  return (
    <div className='flex flex-col items-center justify-center h-full'>


      <Card
        hoverable
        style={{ width: '100%' }}
      >
        <h1 className='text-center text-2xl font-bold '>Wiishy</h1>
        <h2 className='text-center mb-2'>SignOut</h2>
        <Button
          onClick={() => signOut()}
          className='flex justify-center w-full'
          style={{ marginBottom: '10px !important' }}
        >

          <span>SignOut</span>
        </Button>


      </Card>
    </div>
  )
}
