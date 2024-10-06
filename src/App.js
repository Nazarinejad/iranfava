import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProjectList from "./pages/projectList";
import TaskList from "./pages/taskList";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <ProjectList />
        </Route>
        <Route  path="/taskList/:projectId">
          <TaskList />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
