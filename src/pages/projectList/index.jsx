import classes from "./projectList.module.css";
import { useEffect, useState } from "react";
import { Button, Modal, Form, Input } from "antd";
import ProjectItem from './projectItem';

const ProjectList = ({}) => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const getListOfAllProjects = () => {
    fetch("http://localhost:3500/projects")
      .then((response) => response.json())
      .then((json) => {
        setProjects(json);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    getListOfAllProjects();
  }, []);

  const addNewProject = (formValues) => {
    fetch("http://localhost:3500/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formValues),
    })
      .then((response) => response.json())
      .then((json) => {
        setIsLoading(false);
        setOpen(false);
        getListOfAllProjects();
      });
  };

  const showModal = () => {
    setOpen(true);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  const onFinish = (values) => {
    addNewProject(values);
  };

  return (
    <>
      <h1 className={classes.heading}>Project List</h1>

      <Button className={classes.addButton} type="primary" onClick={showModal}>
        Create New Project
      </Button>

      {isLoading ? (
        <div className={classes.textCenter}>loading...</div>
      ) : (
        <div className={classes.project_wrapper}>
          <ProjectItem projects={projects} getListOfAllProjects={getListOfAllProjects}/>
        </div>
      )}

      <Modal
        open={open}
        title="Create Project"
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

export default ProjectList;
