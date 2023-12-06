"use client";
import RecentEventList from "@/app/components/eventComponents/recentEventList/recentEventList";
import { Button } from "antd-mobile";
import { useRouter } from "next/navigation";

function Events() {
  const router = useRouter();

  return (
    <>
      <div className="py-5 px-2 h-full">
        <h1 className="main-head">Events</h1>
        <div className="grid mb-10 mt-7">
          <Button
            onClick={() => router.push("/profile/add-event")}
            className="btn-regular-outline w-full mb-3"
          >
            + Add new event
          </Button>
          <div className="mt-3 h-full">
            <RecentEventList />
          </div>
        </div>
      </div>
    </>
  );
}

export default Events;
