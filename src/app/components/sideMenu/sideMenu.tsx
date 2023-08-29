import { Image, List, Switch } from 'antd-mobile'
import { PayCircleOutline, SetOutline, UnorderedListOutline } from "antd-mobile-icons";
import './style.css';
import People from '../people/people';


function SideMenu() {
  return (

    <div className="sidemenu-container">
     
      <div className='sidemenu-header'>
          <Image alt='Wiishy' src='/wisshy.png' width={100} />
          <p className='pl-4'>An ultimate wishlist</p>
       
      </div>
      <List header='Menu'>
        <List.Item prefix={<UnorderedListOutline />} onClick={() => { }}>
          Home
        </List.Item>
        <List.Item prefix={<PayCircleOutline />} onClick={() => { }}>
          Event
        </List.Item>
        <List.Item prefix={<SetOutline />} onClick={() => { }}>
          Search
        </List.Item>
        <List.Item prefix={<SetOutline />} onClick={() => { }}>
          Followers
        </List.Item>
        <List.Item prefix={<SetOutline />} onClick={() => { }}>
          Followings
        </List.Item>
      </List>

      <List header='Setting'>
        <List.Item extra={<Switch defaultChecked />}>Dark mode</List.Item>
      </List>
    </div>

  );
}

export default SideMenu;