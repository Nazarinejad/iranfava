import classes from "./projectItem.module.css";
import { Link } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";

const ProjectItem = ({ projects, getListOfAllProjects }) => {
  const deleteProject = (id) => {
    fetch(`http://localhost:3500/projects/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((json) => {
        getListOfAllProjects();
      });
  };

  return (
    <>
      {projects.length > 0 ? (
        projects.map((project) => (
          <div key={project.id} className={classes.projectCard}>
            <div
              className={classes.deleteIcon_wrapper}
              onClick={() => deleteProject(project.id)}
            >
              <i>Delete</i>
              <DeleteOutlined />
            </div>
            <h5>{project.name}</h5>
            <p>{project.description}</p>
            <Link
              className={classes.showMoreBtn}
              to={`/taskList/${project.id}`}
            >
              View Tasks
            </Link>
          </div>
        ))
      ) : (
        <>
          <div className={classes.noDataBox}>No Data</div>
        </>
      )}
    </>
  );
};

export default ProjectItem;
