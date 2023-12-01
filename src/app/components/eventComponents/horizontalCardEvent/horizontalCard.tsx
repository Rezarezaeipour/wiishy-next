"use client";
import { List, Button } from "antd-mobile";
import "./style.css";
import { Event } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";

function HorizontalEventCard(props: { event: Event }) {
  const router = useRouter();
  return (
    <>
      <List.Item className="mb-2 px-3  rounded-md" onClick={()=>{router.push(`/profile/edit-event/${props.event.id}`)}}>
          <div className="flex items-center py-1 px-3">
            <Image
              className="basia mr-5 w-[40px] h-[auto]"
              src={`/events/${props.event.event_type_id}.png`}
              width={40}
              height={40}
              alt=""
            />
            <div className="flex flex-col">
              <p className="font-bolder text-md">{props.event.remaining_days} days to {props.event.event_type}</p>
              <p>{props.event.name}&nbsp;{props.event.family} </p>
            </div>
          </div>
      
        {/* </div> */}
      </List.Item>
    </>
  );
}

export default HorizontalEventCard;
