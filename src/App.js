import React, { useEffect } from "react";
import "./App.css";
import Project from "./components/Project";
import ProjectLinks from "./components/ProjectLinks";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const iniList = [
    {
      id: 1,
      name: "ToDo",
      project: [{ id: 1, content: "Work on Project", isComplete: false }],
    },
    {
      id: 2,
      name: "Movies",
      project: [
        { id: 1, content: "Watch Mirzapur Season 2", isComplete: false },
        { id: 2, content: "Watch Peaky Blinders", isComplete: false },
      ],
    },
    {
      id: 3,
      name: "Video games",
      project: [
        { id: 1, content: "Play GTA 5", isComplete: false },
        { id: 2, content: "Play Watch Dogs", isComplete: false },
      ],
    },
  ];

  const initialLocalStorage = localStorage.getItem("mainList");

  const [mainList, setMainList] = React.useState(
    initialLocalStorage ? JSON.parse(initialLocalStorage) : iniList
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
      const newList = mainList.filter((item) => item.id === projectId);
      const newTask = {
        id: newList[0].project.length + 1,
        content: event.target.value,
        isComplete: false,
      };
      const list = [...newList[0].project, newTask];
      const myList = mainList.map((item) => {
        if (item.id === projectId) {
          item.project = list;
        }
        return item;
      });
      setMainList(myList);
      event.target.value = "";
    }
  };

  const onDelete = (id, projectId) => {
    const newList = mainList.filter((item) => item.id === projectId);
    const list = newList[0].project.filter((item) => item.id !== id);
    const myList = mainList.map((item) => {
      if (item.id === projectId) {
        item.project = list;
      }
      return item;
    });
    setMainList(myList);
  };

  const onDone = (id, projectId) => {
    const myList = mainList.map((item) => {
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
    setMainList(myList);
  };

  // this is only for project section
  const addNewProject = (event) => {
    if (event.target.value === "") {
      return;
    }
    if (event.keyCode === 13) {
      if (
        mainList.filter(
          (project) =>
            project.name.toLowerCase() === event.target.value.toLowerCase()
        ).length > 0
      ) {
        return;
      }
      const newProject = {
        id: mainList.length + 1,
        name: event.target.value,
        project: [],
      };
      const newList = [...mainList, newProject];
      setMainList(newList);
      event.target.value = "";
    }
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
