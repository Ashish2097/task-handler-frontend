import * as React from 'react';
import { useState, useEffect } from 'react';
import { getAllTasks, markDoneApi, pickTaskApi } from '../../api/apis';
import { Avatar, Progress, Button, Modal, DatePicker } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';


const User = () => {
  const [taskList, setTaskList] = useState({});
  const [userData, setUserData] = useState({});
  const [pickTimeModalVisible, setPickTimeModalVisible] = useState(false);
  const [pickedTime, setPickedTime] = useState(undefined);
  const [selectedTaskId, setSelectedTaskId] = useState(undefined);
  const location = useLocation();
  
  const getTaskList = async () => {
    const response = await getAllTasks();
    if (response.isSuccess) {
      setTaskList(response.data);
    } else {
      alert(response.error || 'Something went wrong');
    }
  }

  const markDone = async (taskId) => {
    const response = await markDoneApi({ taskId });
    if (response.isSuccess) {
      getTaskList();
    } else {
      alert(response.error || 'Something went wrong');
    }
  }

  const pickTask = async () => {
    if (!selectedTaskId) return;
    const response = await pickTaskApi();
    if (response.isSuccess) {
      handleModalClose();
      getTaskList();
    } else {
      alert(response.error || 'Something went wrong');
    }
  }

  const renderButton = (status, id) => {
    if (status === 'To-Do') {
      return <Button onClick={() => {
        setSelectedTaskId(id);
        setPickTimeModalVisible(true);
      }}>
        Pick
      </Button>
    } else if (status === 'In Progress') {
      return <Button onClick={() => markDone(id)}>
        Mark Done
      </Button>
    } else {
      return null;
    }
  }

  const handleModalClose = () => {
    setPickTimeModalVisible(false);
    setPickedTime(undefined);
    setSelectedTaskId(undefined);
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
                <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: 20 }}>
                  <h2>
                    {task.status}
                  </h2>
                  <span style={{ marginLeft: 20 }}>{renderButton(task.status, task.id)}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      {pickTimeModalVisible && <Modal
      visible={pickTimeModalVisible}
      okText={'Pick Task'}
      onCancel={() => {
        handleModalClose();
      }}
      closable={false}
      onOk={() => {
        pickTask();
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <span>Select Task Start Time</span>
          <DatePicker
          showTime={true}
          placeholder={'Select Date and Time'}
          value={pickedTime}
          onChange={(val) => setPickedTime(val)}></DatePicker>
        </div>
      </Modal>}
    </>
  );
}

export default User;