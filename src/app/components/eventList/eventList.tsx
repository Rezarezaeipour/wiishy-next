"use client"
import { Event } from "@/types";
import { getMyEventList } from "@/app/api-client/events";
import HorizontalEventCard from "../horizontalCardEvent/horizontalCard";
import { useEffect, useState } from "react";


function EventList() {
  
  const [eventlist,setEventlist] = useState<[Event]>();

  useEffect(() => {
    (async ()=>{
        const response = await getMyEventList();
        const tempeventList: [Event] = response.event;
        setEventlist(tempeventList);
    })()
   
  }, []);
  
 
  return(<>
    {eventlist && eventlist.length > 0
      ? eventlist.map((item, index) => {
          return <HorizontalEventCard event={item} key={10} />;
        })
      : "....."}
  </>)
}

export default EventList;
