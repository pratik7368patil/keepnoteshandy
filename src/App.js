import React, { useEffect } from "react";
import "./App.css";
// importing initial data from data file
import { initialList } from "./components/data.js";
import Project from "./components/Project";
import ProjectLinks from "./components/ProjectLinks";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const initialLocalStorage = localStorage.getItem("mainList");

  const [mainList, setMainList] = React.useState(
    initialLocalStorage ? JSON.parse(initialLocalStorage) : initialList
  );

  useEffect(() => {
    localStorage.setItem("mainList", JSON.stringify(mainList));
  }, [mainList]);

  // from here only for projectlist section

  const addElement = (event, projectId) => {
    if (event.keyCode === 13) {
      if (event.target.value === "") {
        return;
      }
      const newListItem = mainList.filter((item) => item.id === projectId);
      const newTask = {
        id: newListItem[0].project.length + 1,
        content: event.target.value,
        isComplete: false,
      };
      const newProjectList = [...newListItem[0].project, newTask];
      const newList = mainList.map((item) => {
        if (item.id === projectId) {
          item.project = newProjectList;
        }
        return item;
      });
      setMainList(newList);
      event.target.value = "";
    }
  };

  const onDelete = (id, projectId) => {
    const newListItem = mainList.filter((item) => item.id === projectId);
    const newProjectList = newListItem[0].project.filter(
      (item) => item.id !== id
    );
    const newList = mainList.map((item) => {
      if (item.id === projectId) {
        item.project = newProjectList;
      }
      return item;
    });
    setMainList(newList);
  };

  const onDone = (id, projectId) => {
    const newList = mainList.map((item) => {
      if (item.id === projectId) {
        item.project.map((task) => {
          if (task.id === id) {
            task.isComplete = !task.isComplete;
          }
          return task;
        });
      }
      return item;
    });
    setMainList(newList);
  };

  // this is only for project section

  const checkDuplicateProjectEntry = (value) => {
    if (
      mainList.filter(
        (project) => project.name.toLowerCase() === value.toLowerCase()
      ).length > 0
    ) {
      return true;
    }
  };

  const addNewProject = (event) => {
    if (event.target.value === "") {
      return false;
    }
    if (checkDuplicateProjectEntry(event.target.value)) {
      return true;
    }
    if (event.keyCode === 13) {
      const newProject = {
        id: mainList.length + 1,
        name: event.target.value.replace(/\b[a-z]/g, (char) =>
          char.toUpperCase()
        ),
        project: [],
      };
      const newList = [...mainList, newProject];
      setMainList(newList);
      event.target.value = "";
    }
    return false;
  };

  const deleteProject = (id) => {
    const newList = mainList.filter((project) => project.id !== id);
    setMainList(newList);
  };

  return (
    <div className="main-section">
      <Router>
        <Grid container>
          <Grid item>
            <Typography variant="h4" className="head" color="textSecondary">
              <Box fontWeight="fontWeightBold" mb={4} mt={2}>
                Projects
              </Box>
            </Typography>
            <ProjectLinks
              list={mainList}
              addNewProject={addNewProject}
              deleteProject={deleteProject}
            />
          </Grid>
          <Divider orientation="vertical" flexItem />
          <Grid item>
            <Switch>
              {mainList.map((project) => {
                return (
                  <Route
                    exact
                    path={`/${project.name.toLowerCase()}`}
                    key={project.id}
                  >
                    <Project
                      key={project.id}
                      project={project}
                      addElement={addElement}
                      onDelete={onDelete}
                      onDone={onDone}
                    />
                  </Route>
                );
              })}
            </Switch>
          </Grid>
        </Grid>
      </Router>
    </div>
  );
}

export default App;
