
import { List, Avatar, Button } from "antd-mobile";
import './style.css';

function People() {
    return (
        <>
            <List>
                <List.Item className="people-name"
                    prefix={<Avatar style={{ '--border-radius': '20px' }} src='/Reza1.jpg' />}
                    description='37 years old | Berlin'
                >
                    <span className="people-desc">Reza Rezaeipour</span>
                    <Button className="follow-btn" >
                        Follow
                    </Button>
                </List.Item>
            </List>
        </>
    );
}

export default People;