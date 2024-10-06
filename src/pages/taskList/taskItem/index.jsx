import classes from "./taskItem.module.css";
import { DeleteOutlined } from "@ant-design/icons";
import { GetStatusName } from "../../../helper/getStatusName";
import { Button, Popover } from "antd";

const TaskItem = ({ tasks, getTasksOfCurrentProject, projectId }) => {
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

  var a = "To_Do";
  return (
    <>
      {tasks &&
        tasks.map((task) => (
          <div key={task.id} className={classes.taskCard}>
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

            <div className={`${classes.status}`}>
              status: {GetStatusName(task.status)}
            </div>
            
            {/* <Link
              className={classes.showMoreBtn}
              to={`/taskList/${task.id}`}
            >
              View Tasks
            </Link> */}
          </div>
        ))}
    </>
  );
};

export default TaskItem;
