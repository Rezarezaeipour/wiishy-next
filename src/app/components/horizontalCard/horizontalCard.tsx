"use client"
import { List, Avatar, Button } from "antd-mobile";
import './style.css';
import { Event } from "@/types";

function HorizontalCard(props : { event : Event}) {
    return (
        <>
       
                <List.Item className="card-name"  
                    prefix={<Avatar src={props.event.image} />}
                    description={props.event.time}
                >
                    <span className="card-desc">{props.event.title}</span>
                </List.Item>
        
        </>
    );
}

export default HorizontalCard;