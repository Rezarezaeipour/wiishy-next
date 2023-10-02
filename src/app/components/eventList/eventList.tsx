
import { Event } from "@/types";
import HorizontalCard from "../horizontalCard/horizontalCard";
import { title } from "process";
import { List } from "antd-mobile";
import { json } from "stream/consumers";

function EventList(props: { eventList: [Event] }) {
   
    return (
        <>
           
            {
        
                props.eventList.map((item, index) => {
                    return(
                        <HorizontalCard key={10} event={{ title: item.title, image: item.image, time: item.time }} />
                    
                    )
                    
                })

            }

        </>
    );
}

export default EventList;