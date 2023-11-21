"use client";
import { Inter } from "next/font/google";
import React from "react";
import "@/app/globals.css";
import Header from "@/app/components/generalComponents/header/header";
import Navbar from "@/app/components/generalComponents/navbar/navbar";


const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <>
    
        <div className="pt-[50px] h-full">
          <Header />
          {children}
          <Navbar />
        </div>
    
    </>
  );
}
