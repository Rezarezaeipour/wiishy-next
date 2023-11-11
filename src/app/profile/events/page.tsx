"use client";
import EventList from "@/app/components/eventList/eventList";
import { Button } from "antd-mobile";
import { useRouter } from "next/navigation";

function Events() {
  const router = useRouter();

  return (
    <>
      <div className="py-5 px-2">
        <h1 className="main-head">Events</h1>
        <h4>
         Here you can find some of the most important events of your life, ex. your wife day or your wedding anniversary,
         your mother birthday or other important events of your life.
        </h4>
        <div className="grid mb-10 mt-7">
          <Button
            onClick={() => router.push("/profile/add-event")}
            className="btn-regular-outline w-full mb-3"
          >
            + Add new event
          </Button>
          <div className="mt-3">
            <EventList
              eventList={[
                {
                  name: "reza",
                  family: "rezaeipour",
                  gender: 1,
                  relationship: 2,
                  eventtype: 2,
                  time: " Date.now",
                },
              ]}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Events;
