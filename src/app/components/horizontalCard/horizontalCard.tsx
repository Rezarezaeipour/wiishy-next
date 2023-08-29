
import { List, Avatar, Button } from "antd-mobile";
import './style.css';

function HorizontalCard() {
    return (
        <>
            <List>
                <List.Item className="card-name"
                    
                    prefix={<Avatar src='/book.jpg' />}
                    description='Last 30 min'
                >
                    <span className="card-desc">Reza added a gift</span>
                   
                </List.Item>
            </List>
        </>
    );
}

export default HorizontalCard;