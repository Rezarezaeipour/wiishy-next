"use client";

import { SpinLoading } from "antd-mobile";

function Loading() {
  return (
    <>
      <div className="w-full h-full flex flex-row align-middle justify-center" >
        <div>
          <p>Loading</p>
          <SpinLoading color="black" style={{ "--size": "24px" }} />
        </div>
      </div>
    </>
  );
}

export default Loading;
