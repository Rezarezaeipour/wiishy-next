'use client'
import { GoogleOutlined, LinkedinOutlined } from '@ant-design/icons'
import { Card } from 'antd'
import { Button } from 'antd-mobile'
import { signIn } from 'next-auth/react'

export default function Login() {
  return (
    <div className='flex flex-col items-center justify-center h-full'>


      <Card
        hoverable
        style={{ width: '100%' }}
        cover={<img alt="wiishy" src="/intro.jpg" />}
      >
        <h1 className='text-center text-2xl font-bold '>Wiishy</h1>
        <h2 className='text-center mb-2'>An ultimate wishlist for proffesionals!</h2>
        <Button
          onClick={() => signIn('linkedin')}
          className='flex justify-center w-full'
          style={{marginBottom:'10px !important'}}
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
      </Card>
    </div>
  )
}
