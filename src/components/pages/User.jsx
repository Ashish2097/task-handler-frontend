import * as React from 'react';
import { useState, useEffect } from 'react';
import { getAllTasks } from '../../api/apis';
import { Avatar, Progress } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';


const User = () => {
  const [taskList, setTaskList] = useState({});
  const [userData, setUserData] = useState({});
  const location = useLocation();
  
  const getTaskList = async () => {
    const response = await getAllTasks();
    if (response.isSuccess) {
      setTaskList(response.data);
    } else {
      alert(response.error || 'Something went wrong');
    }
  }

  useEffect(() => {
    getTaskList();  
  }, []);

  useEffect(() => {
    console.log(location, ": here");
    setUserData(location?.state?.userData);
  }, [location]);

  return (
    <>
      <div style={{ borderBottom: '2px solid #5a5757', padding: '30px 72px', display: 'flex', alignItems: 'center' }}>
        <Avatar size={100} icon={<UserOutlined />} />
        <span style={{ fontSize: 42, paddingLeft: 20 }}>
          {userData?.name}
        </span>
      </div>
      <div style={{ padding: 60, textAlign: 'left', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        {taskList?.length && taskList.map(task => {
          const taskCompletePercent = (task.timeElapsed / task.timeEstimate) * 100;
          const timeLeft = task.timeEstimate - task.timeElapsed; 
          return (
            <div>
              <Progress
                type="circle"
                width={200}
                percent={taskCompletePercent}
                format={percent => {
                  if (timeLeft >= 0) {
                    return `${timeLeft} hrs left`;
                  }
                  return 'Dead';
                }}
              />
              <div style={{ paddingLeft: 20 }}>
                <h1>
                  {task.title}
                </h1>
                <div>
                  {task.description}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  );
}

export default User;