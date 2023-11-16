"use client";
import EventList from "@/app/components/eventList/eventList";
import FollowingList from "@/app/components/followingList/followingList";
import { Button } from "antd-mobile";
import { useRouter } from "next/navigation";

function Followings({ params } : { params: { userId: number, name : string } }) {
  const router = useRouter();

  return (
    <>
      <div className="py-5 px-2 h-full">
        <h1 className="main-head">Followings of {params.name}</h1>
        <h4>
        All people youve followed in Wiishy app are listed here.
        </h4>
        <div className="grid mb-10 mt-7">
          <div className="mt-3 h-full">
            <FollowingList userId={params.userId} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Followings;
