"use client";
import { Event } from "@/types";
import { getMyRecentEventList } from "@/app/api-client/events";
import HorizontalEventCard from "../horizontalCardEvent/horizontalCard";
import { useEffect, useState } from "react";
import Loading from "@/app/loading";
import Link from "next/link";

function RecentEventList() {
  const [eventlist, setEventlist] = useState<[Event]>();

  useEffect(() => {
    (async () => {
      const response = await getMyRecentEventList();
      const tempeventList: [Event] = response.event;
      setEventlist(tempeventList);
    })();
  }, []);

  return (
    <div className="h-full w-full">
      {eventlist ? (
        eventlist && eventlist.length > 0 ? (
          eventlist.map((item, index) => {
            return <HorizontalEventCard event={item} key={`evennt${index}`} />;
          })
        ) : (
          <div className="w-full h-full flex flex-col justify-center items-center">
            <p className="w-full text-center mt-6">
              Here you can find the events happening <br/> in the next 30 days
              <br/>
              There is no close event
            </p>
            <br/>
            <Link className="underline" href={'/profile/my-profile?e=1'}>my registered events</Link>
          </div>
        )
      ) : (
        <div className="mt-3">
          <Loading />
        </div>
      )}
    </div>
  );
}

export default RecentEventList;
