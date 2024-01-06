"use client";
import { Event } from "@/types";
import { getMyRecentEventList } from "@/app/api-client/events";
import HorizontalEventCard from "../horizontalCardEvent/horizontalCard";
import { useEffect, useState } from "react";
import Loading from "@/app/loading";
import Link from "next/link";
import HorizontalCardEvent_2 from "../horizontalCardEvent_2/horizontalCardEvent_2";

function RecentEventList() {
  const [eventlist, setEventlist] = useState<[Event]>();

  useEffect(() => {
    (async () => {
      const response = await getMyRecentEventList();
      // console.log(response);
      const tempeventList: [Event] = response.events;
      setEventlist(tempeventList);
    })();
  }, [setEventlist]);

  return (
    <div className="h-full w-full">
      {eventlist ? (
        eventlist && eventlist.length > 0 ? (
          eventlist.map((item, index) => {
            return <HorizontalCardEvent_2 event={item} key={`evennt${index}`} />;
          })
        ) : (
          <div className="w-full h-full flex flex-col justify-center items-center">
            <p className="w-full text-center mt-6">
            There are no close events <br/> in the next 30 days
              <br/>
              
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
