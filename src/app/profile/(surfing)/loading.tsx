"use client";

import { SpinLoading } from "antd-mobile";

function Loading() {
  return (
    <>
      <div className="w-full h-full flex flex-col items-center justify-center">
        <SpinLoading color="black" style={{ "--size": "24px" }} />
        <p>Loading</p>
      </div>
    </>
  );
}

export default Loading;
