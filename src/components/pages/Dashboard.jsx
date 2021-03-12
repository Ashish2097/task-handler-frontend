import * as React from 'react';
import { useState, useEffect } from 'react';
import { getAllUsers } from '../../api/apis';

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
    <div>
      {/* {userList.map(user => {
        return <div>
          {user.name}
        </div>
      })} */}
    </div>
  );
}

export default Dashboard;