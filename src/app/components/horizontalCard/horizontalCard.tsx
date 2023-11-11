"use client";
import { List, Avatar, Button } from "antd-mobile";
import "./style.css";
import { Event } from "@/types";
import Image from "next/image";

function HorizontalEventCard(props: { event: Event }) {
  return (
    <>
      <List.Item>
        <div className="flex justify-between items-center rounded-[10px] py-1 px-3">
          <div className="flex items-center ">
            <Image
              className="basia mr-5 w-[50px] h-[auto]"
              src="/birthday.png"
              width={100}
              height={100}
              alt=""
            />
            <div className="flex flex-col">
              <p className="font-bold text-md ">10 Days to Birthday</p>
              <p>Reza Rezaeipour </p>
            </div>
          </div>
          <div>
            <Button className="bt btn-regular-outline">Idea for gift</Button>
          </div>
        </div>
      </List.Item>
    </>
  );
}

export default HorizontalEventCard;
