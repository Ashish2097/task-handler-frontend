import * as React from 'react';
import { useState, useEffect } from 'react';
import { getAllUsers } from '../../api/apis';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';


const Dashboard = () => {
  const [userList, setUserList] = useState({});

  const getUserList = async () => {
    const response = await getAllUsers();
    if (response.isSuccess) {
      setUserList(response.data);
    } else {
      alert(response.error || 'Something went wrong');
    }
  }

  useEffect(() => {
    getUserList();  
  }, []);


  return (
    <div style={{ textAlign: 'left' }}>
      {userList?.length && userList.map(user => {
        return <div>
          <Link to={{
            pathname: `/user/${user.id}`,
            state: { userData: user },
          }}>
            <Avatar size={64} icon={<UserOutlined />} />
            {user.name}
          </Link>
        </div>
      })}
    </div>
  );
}

export default Dashboard;