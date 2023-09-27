
import { List, Avatar, Button } from "antd-mobile";
import './style.css';

function ProfileCard(props : { avatar : string , name : string  }) {
    return (
        <>
            <List>
                <List.Item className="people-name"
                    prefix={<Avatar style={{ '--border-radius': '20px' }} src={props.avatar} />}
                    description='37 years old | Berlin'
                >
                    <span className="people-desc">{props.name}</span>
                </List.Item>
            </List>
        </>
    );
}

export default ProfileCard;