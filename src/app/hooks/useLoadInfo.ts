"use client";
import { useEffect, useState } from "react";

export default async function useLoadInfo() {
  const res = await fetch("/api/getuserdata", {
    method:"GET",
    headers: {
      "Content-Type": "application/json"
    },
  });
  const data = await res.json();
  return data;
}
