import classes from "./taskList.module.css";
import { useEffect, useState } from "react";
import { Button, Modal, Form, Input, Select, DatePicker } from "antd";
import { useParams } from "react-router-dom";
import TaskItem from "./taskItem";
import { StatusEnum } from "../../enums/statusEnum";

const TaskList = ({}) => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  let { projectId } = useParams();

  const selectListOptions = [
    {
      value: StatusEnum.To_Do,
      label: "To Do",
    },
    {
      value: StatusEnum.In_Progress,
      label: "In Progress",
    },
    {
      value: StatusEnum.Done,
      label: "Done",
    },
  ];

  const getTasksOfCurrentProject = () => {
    fetch(`http://localhost:3500/tasks?projectId=${projectId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log("sd", json);
        setTasks(json);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    getTasksOfCurrentProject();
  }, []);

  const addNewTask = (formValues) => {
    fetch(`http://localhost:3500/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formValues, projectId }),
    })
      .then((response) => response.json())
      .then((json) => {
        setIsLoading(false);
        setOpen(false);
        getTasksOfCurrentProject();
      });
  };

  const showModal = () => {
    setOpen(true);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  const onFinish = (values) => {
    addNewTask(values);
  };

  return (
    <>
      <h1 className={classes.heading}>
        Task List of Project number {projectId}
      </h1>

      <Button className={classes.addButton} type="primary" onClick={showModal}>
        Create New Task
      </Button>

      {isLoading ? (
        <div className={classes.textCenter}>loading...</div>
      ) : (
        <div className={classes.task_wrapper}>
          <TaskItem
            tasks={tasks}
            getTasksOfCurrentProject={getTasksOfCurrentProject}
            projectId={projectId}
          />
        </div>
      )}

      <Modal
        open={open}
        title="Create Task"
        onCancel={handleCancel}
        footer={false}
      >
        <Form onFinish={onFinish} autoComplete="off">
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "This input is required!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <Input />
          </Form.Item>

          <Form.Item label="Status" name="status">
            <Select
              options={selectListOptions}
              rules={[
                {
                  required: true,
                  message: "This input is required!",
                },
              ]}
            />
          </Form.Item>

          <Form.Item label="DueDate" name="dueDate">
            <DatePicker
              rules={[
                {
                  required: true,
                  message: "This input is required!",
                },
              ]}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default TaskList;
