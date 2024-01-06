"use client";
import { List, Button } from "antd-mobile";
import "./style.css";
import { Event } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";

function HorizontalCardEvent_2(props: { event: Event }) {
  const router = useRouter();
  return (
    <>
      <List.Item
        className="mb-2 px-3 rounded-md h-event-container"
        onClick={() => {
          router.push(`/profile/gift-suggest/${props.event.user_id}`);
        }}
      >
        <div className="flex items-center py-1 px-3">
          <Image
            className="basia mr-5 w-[40px] h-[auto]"
            src={`/events/${props.event.event_type_id}.png`}
            width={40}
            height={40}
            alt=""
          />
          <div className="flex flex-col">
            {props.event.remaining_days > 0 ? (
              <p className="event-list-top-line font-bolder text-md">
                {props.event.remaining_days} days to {props.event.event_type}
              </p>
            ) : (
              <p className="event-list-top-line font-bolder text-md">
                Today is the {props.event.event_type}
              </p>
            )}

            <p className="event-list-bottom-line">
              {props.event.name}&nbsp;{props.event.family}{" "}
            </p>
          </div>
        </div>

        {/* </div> */}
      </List.Item>
    </>
  );
}

export default HorizontalCardEvent_2;
