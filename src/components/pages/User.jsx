import * as React from 'react';
import { useState, useEffect } from 'react';
import { getAllTasks, addTaskToQueue, markDoneApi, pickTaskApi } from '../../api/apis';
import { Avatar, Button, Input, Progress, DatePicker, Modal } from 'antd';
import { UserOutlined, VerticalLeftOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import moment from 'moment';
import config from '../../config';

const User = () => {
  const [taskList, setTaskList] = useState({});
  const [userData, setUserData] = useState({});
  const [pickTimeModalVisible, setPickTimeModalVisible] = useState(false);
  const [pickedTime, setPickedTime] = useState(undefined);
  const [selectedTaskId, setSelectedTaskId] = useState(undefined);
  const [buttonColor, setButtonColor] = useState('#ffffff');
  const [visible, setVisible] = useState(false);
  const [taskTitle, setTaskTitle] = useState();
  const [taskDescription, setTaskDescription] = useState();
  const [taskTimeEstimate, setTaskTimeEstimate] = useState();
  const [taskJiraId, setTaskJiraId] = useState();

  const location = useLocation();
  
  const getTaskList = async () => {
    if (!userData.id) {
      return;
    }
    const response = await getAllTasks(userData.id);
    if (response.isSuccess) {
      setTaskList(response.data?.data?.[userData.id]);
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

  console.log(taskList, ": here");
  const pickTask = async () => {
    if (!selectedTaskId) return;
    console.log(selectedTaskId, ": here selected");
    console.log(pickedTime, ": here picked");
    const response = await pickTaskApi({
      id: selectedTaskId,
      startingTime: pickedTime || moment(),
    });
    if (response.isSuccess) {
      handleModalClose();
      setTimeout(() => getTaskList(), 2000);
    } else {
      alert(response.error || 'Something went wrong');
    }
  }

  const renderButton = (status, id) => {
    if (status === 'TO-DO') {
      return <Button onClick={() => {
        setSelectedTaskId(id);
        setPickTimeModalVisible(true);
      }}>
        Pick
      </Button>
    } else if (status === 'IN PROGRESS') {
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
  const handleAddTaskModalClose = () => {
    setVisible(false);
    setTaskTitle(undefined);
    setTaskDescription(undefined);
    setTaskTimeEstimate(undefined);
    setTaskJiraId(undefined);
  }

  useEffect(() => {
    getTaskList();  
  }, [userData]);

  useEffect(() => {
    console.log(location, ": here");
    setUserData(location?.state?.userData);
  }, [location]);

  const handleAddTaskToQueue = async () => {
    const response = await addTaskToQueue({
      assignorId: config.loggedInUser,
      assigneeId: userData.id,
      title: taskTitle,
      description: taskDescription,
      jiraId: taskJiraId,
      timeEstimate: taskTimeEstimate,
    });
    if (response.isSuccess) {
      setButtonColor('rgb(92 196 49)');
      getTaskList();
    } else {
      setButtonColor('#ed494c');
    }
    setTimeout(() => {
      setButtonColor('#ffffff');
    }, 2000);
    handleAddTaskModalClose();
  }
  return (
    <>
      <div style={{ borderBottom: '2px solid #5a5757', padding: '30px 72px', display: 'flex', alignItems: 'center' }}>
        <Avatar size={100} icon={<UserOutlined />} />
        <span style={{ fontSize: 42, paddingLeft: 20 }}>
          {userData?.name}
        </span>
        <Button type="text" style={{ backgroundColor: buttonColor, marginTop: 10, marginLeft: 28, border: '1px solid' }} onClick={() => setVisible(true)}><VerticalLeftOutlined />Add Task To Queue</Button>
      </div>
      <div style={{ padding: 60, textAlign: 'left', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        {taskList?.length && taskList.map(task => {
          const taskCompletePercent = ((task.time_elapsed || 0) / task.time_estimate) * 100;
          const timeLeft = task.time_estimate - (task.time_elapsed || 0); 
          return (
            <div>
              <Progress
                type="circle"
                width={200}
                percent={taskCompletePercent}
                format={percent => {
                  if (timeLeft >= 0) {
                    return `${timeLeft.toFixed(2)} hrs left`;
                  }
                  return 'Dead';
                }}
              />
              <div style={{ paddingLeft: 20 }}>
                <h1 style={{ marginBottom: 0 }}>
                  {task.title}
                </h1>
                <div style={{ marginTop: 5 }}>
                  {task.description}
                </div>
                <h3>
                  {task.jira_id}
                </h3>
                <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: 5 }}>
                  <h2>
                    {task.status}
                  </h2>
                  <span style={{ marginLeft: 20 }}>{renderButton(task.status, task.id)}</span>
                </div>
              </div>
            </div>
          )
        })}
        <Modal
          title="Add Task"
          visible={visible}
          onOk={handleAddTaskToQueue}
          onCancel={() => setVisible(false)}>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Input
              title="Title"
              value={taskTitle}
              placeholder="Add Title"
              onChange={(e) => setTaskTitle(e.target.value)}
            /><br/>
            <Input
              title="Description"
              placeholder="Add Description"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
            /><br/>
            <Input
              title="Time Estimate"
              placeholder="Add Time Estimate"
              value={taskTimeEstimate}
              onChange={(e) => setTaskTimeEstimate(e.target.value)}
            /><br/>
            <Input
              title="Jira Id"
              placeholder="Add Jira Id"
              value={taskJiraId}
              onChange={(e) => setTaskJiraId(e.target.value)}
            />
          </div>
        </Modal>
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
          defaultValue={moment()}
          onChange={(val) => setPickedTime(val)}></DatePicker>
        </div>
      </Modal>}
    </>
  );
}

export default User;