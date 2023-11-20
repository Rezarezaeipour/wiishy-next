'use client'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import React from "react";
import './globals.css';
import { SessionProvider } from 'next-auth/react';

// import Header from '@/app/components/header'
// import Navbar from '@/app/components/navbar';



const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({ children, }: { children: React.ReactNode }) {

  return (
    <html>
      <body className={inter.className} >
        <React.StrictMode>
          <SessionProvider>{children}</SessionProvider>
        </React.StrictMode>
      </body>
    </html>
  )
}
