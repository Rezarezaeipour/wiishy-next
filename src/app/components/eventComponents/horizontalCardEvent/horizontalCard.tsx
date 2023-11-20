"use client";
import { List, Avatar, Button } from "antd-mobile";
import "./style.css";
import { Event } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";

function HorizontalEventCard(props: { event: Event }) {
  const router = useRouter();
  return (
    <>
      <List.Item className="mb-2">
        <div className="flex justify-between items-center rounded-[10px] py-1 px-3">
          <div className="flex items-center ">
            <Image
              className="basia mr-5 w-[50px] h-[auto]"
              src={`/events/${props.event.event_type_id}.png`}
              width={100}
              height={100}
              alt=""
            />
            <div className="flex flex-col">
              <p className="font-bold text-md ">{props.event.remaining_days} days to {props.event.event_type}</p>
              <p>{props.event.name}&nbsp;{props.event.family} : {props.event.event_type}</p>
            </div>
          </div>
          <div>
            <Button onClick={()=>{router.push(`/profile/idea/${props.event.id}`)}} className="bt btn-regular-outline" style={{fontSize:"10px !important"}}>Gift idea</Button>
          </div>
        </div>
      </List.Item>
    </>
  );
}

export default HorizontalEventCard;
