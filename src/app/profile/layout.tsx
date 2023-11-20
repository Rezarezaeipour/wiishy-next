"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";
import "@/app/globals.css";
import { LoginProvider } from "@/app/context/loginContext";
import Header from "../components/generalComponents/header/header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LoginProvider>
        <Header />
        {children}
      </LoginProvider>
    </>
  );
}
