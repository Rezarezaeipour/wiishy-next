"use client";
import { Event } from "@/types";
import { getMyRecentEventList } from "@/app/api-client/events";
import HorizontalEventCard from "../horizontalCardEvent/horizontalCard";
import { useEffect, useState } from "react";
import Loading from "@/app/loading";

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
          <div className="w-full h-full flex justify-center items-center">
            <p className="w-full text-center">
              There is no close event
            </p>
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
