'use client'
import { GoogleOutlined, LinkedinOutlined } from '@ant-design/icons'
import { Card } from 'antd'
import { Button } from 'antd-mobile'
import { signIn } from 'next-auth/react'
import Image from 'next/image'

export default function Login() {
  return (
    <div className='flex flex-col items-center space-y-3 justify-center h-full bg-white p-4'>

     
        <h1 className='text-center text-4xl font-bold '>Wiishy</h1>
        <h2 className='text-center '>An ultimate wishlist for proffesionals!</h2>
        <Button
          onClick={() => signIn('linkedin',{callbackUrl:"/profile/loginRedirect"})}
          className='flex justify-center w-full'
        >
          <LinkedinOutlined className='mr-1' />
          <span>Linkedin</span>
        </Button>
     
        <Button
          onClick={() => signIn('google')}
          className='flex justify-center w-full'
        >
          <GoogleOutlined className='mr-1'/>
          <span>Google</span>
        </Button>
    
    </div>
  )
}
