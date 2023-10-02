import EventList from "@/app/components/eventList/eventList";

function Events() {
    return (<>
        <div className="py-5 px-2">
            <h1 className="main-head">Events</h1>
            <div className="grid  mt-7 mb-10 ">
                <EventList eventList={[{title:'hi',image:'/wiishy.png',time:'23 days ago'}]} /> 
            </div>
        </div>
    </>);
}

export default Events;