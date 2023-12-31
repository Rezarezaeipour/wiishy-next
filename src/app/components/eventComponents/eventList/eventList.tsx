"use client";
import { Event } from "@/types";
import { getMyEventList } from "@/app/api-client/events";
import HorizontalEventCard from "../horizontalCardEvent/horizontalCard";
import { useEffect, useState } from "react";
import Loading from "@/app/loading";

function EventList() {
  const [eventlist, setEventlist] = useState<[Event]>();

  useEffect(() => {
    (async () => {
      const response = await getMyEventList();
   
      const tempeventList: [Event] = response.event;
     
      setEventlist(tempeventList);

    })();
  }, []);

  return (
    <div className="h-full w-full">
      {eventlist && eventlist.length > 0 ? (
        eventlist.map((item, index) => {
          return <HorizontalEventCard event={item} key={`evennt${index}`} />;
        })
      ) : (
        <div className="mt-3">
          <Loading />
        </div>
      )}
    </div>
  );
}

export default EventList;
