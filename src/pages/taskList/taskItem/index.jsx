import classes from "./taskItem.module.css";
import { DeleteOutlined } from "@ant-design/icons";
import { GetStatusName } from "../../../helper/getStatusName";
import { Dropdown, message, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { StatusEnum } from "../../../enums/statusEnum";
import { useState } from "react";

const TaskItem = ({ tasks, getTasksOfCurrentProject, projectId }) => {
  const [selectedTask, setSelectedTask] = useState({});

  const deleteTask = (id) => {
    fetch(`http://localhost:3500/tasks/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((json) => {
        getTasksOfCurrentProject();
      });
  };

  const updateTaskStatus = (statusId) => {
    fetch(`http://localhost:3500/tasks/${selectedTask.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...selectedTask, status: statusId }),
    })
      .then((response) => response.json())
      .then((json) => {
        getTasksOfCurrentProject();
      });
  };

  const onClick = ({ key }) => {
    updateTaskStatus(key)
  };

  const items = [
    {
      label: "To_Do",
      key: 0,
    },
    {
      label: "In_Progress",
      key: 1,
    },
    {
      label: "Done",
      key: 2,
    },
  ];

  return (
    <>
      {tasks.length>0 ?
        tasks.map((task) => (
          <div
            onClick={() => setSelectedTask(task)}
            key={task.id}
            className={classes.taskCard}
          >
            <div
              className={classes.deleteIcon_wrapper}
              onClick={() => deleteTask(task.id)}
            >
              <i>Delete</i>
              <DeleteOutlined />
            </div>

            <h5>{task.name}</h5>

            <div>
              Due Date : {task.dueDate.slice(0, task.dueDate.lastIndexOf("T"))}
            </div>

            <p>{task.description}</p>

            {/* <div className={`${classes.status}`}>
              status: {GetStatusName(task.status)}
            </div> */}

            <Dropdown
              trigger={["click"]}
              menu={{
                items,
                onClick,
              }}
            >
              <a
                className={classes.changeStatusDropdown}
                onClick={(e) => e.preventDefault()}
              >
                <Space>
                  <div className={`${classes.status}`}>
                    Current Status: {GetStatusName(task.status)}
                  </div>
                  Change Status To:
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>

            {/* <Link
              className={classes.showMoreBtn}
              to={`/taskList/${task.id}`}
            >
              View Tasks
            </Link> */}
          </div>
        )) : (<><div className={classes.noDataBox}>No Data</div></>)}
    </>
  );
};

export default TaskItem;
