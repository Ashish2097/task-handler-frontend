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
      setUserList(response.data.data);
    } else {
      alert(response.error || 'Something went wrong');
    }
  }

  useEffect(() => {
    getUserList();  
  }, []);


  console.log(userList, ": herer");
  return (
    <div style={{ textAlign: 'left' }}>
      {userList?.length && userList.map(user => {
        return <div style={{ marginTop: 10, marginLeft: 8 }}>
          <Link to={{
            pathname: `/user/${user.id}`,
            state: { userData: user },
          }}>
            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
            <Avatar size={64} icon={<UserOutlined />} />
            <h3 style={{ marginLeft: 10, color: '#1890FF' }}>{user.name}</h3>
            <h4 style={{ marginLeft: 10, color: '#1890FF' }}>{user.team}</h4>
            <h5 style={{ marginLeft: 10, color: '#1890FF' }}>{user.department}</h5>
            </div>
          </Link>
        </div>
      })}
    </div>
  );
}

export default Dashboard;