
import { Event } from "@/types";
import HorizontalEventCard from "../horizontalCard/horizontalCard";


function EventList(props: { eventList: [Event] }) {
   
    return (
        <>
            {
                props.eventList.map((item, index) => {
                    return(
                        <HorizontalEventCard key={10} event={item} />
                    )  
                })
            }
        </>
    );
}

export default EventList;