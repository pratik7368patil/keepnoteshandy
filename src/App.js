import { makeStyles, useTheme } from "@material-ui/core/styles";
import React, { useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import "./App.css";
// importing initial data from data file
import { initialList } from "./components/data.js";
import Project from "./components/Project";
import ProjectLinks from "./components/ProjectLinks";
import Home from "./components/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "89.75vh",
    width: "98.81vw",
    [theme.breakpoints.down("sm")]: {
      width: "100vw",
    },
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    background: "#2b2b2b",
    boxShadow: "none",
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    width: "100%",
    height: "100%",
  },
}));

function App(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  // this is main part of state

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
        id: Math.floor(Math.random() * 100000000 + 1),
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
        id: Math.floor(Math.random() * 100000000 + 1),
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

  const drawer = (id) => {
    return (
      <div>
        <Box p={1}>
          <Typography variant="h4" color="textSecondary">
            <Box fontWeight="fontWeightBold" mb={2} mt={2}>
              Projects
            </Box>
          </Typography>
          <Box mb={2}>
            <Divider />
          </Box>
          <ProjectLinks
            list={mainList}
            customId={id}
            addNewProject={addNewProject}
            deleteProject={deleteProject}
          />
        </Box>
      </div>
    );
  };

  const drawerMobile = drawer(1);
  const drawerPC = drawer(2);

  return (
    <div className={classes.root}>
      <Router>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              <Box fontWeight="fontWeightBold">Keep Notes</Box>
            </Typography>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer} aria-label="mailbox folders">
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true,
              }}
            >
              {drawerPC}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawerMobile}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
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
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </main>
      </Router>
    </div>
  );
}

export default App;
