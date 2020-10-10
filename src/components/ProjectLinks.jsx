import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import { Delete } from "@material-ui/icons";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 300,
    marginRight: 10,
    backgroundColor: theme.palette.background.paper,
  },
  listItemContainer: {
    display: "flex",
  },
  listItem: {
    margin: 2,
    borderRadius: 5,
    "&:hover": {
      background: "#2B2B2B",
      color: "white",
    },
  },
  deleteIcon: {
    color: "#2B2B2B",
    "&:hover": {
      color: "red",
    },
  },
}));

export default function ProjectLinks(props) {
  const classes = useStyles();

  const { list, addNewProject, deleteProject } = props;
  const [validityOfNewProject, setValidityOfNewProject] = React.useState(false);
  const updateValidityAndAddNewProject = (event) => {
    setValidityOfNewProject(addNewProject(event));
  };
  return (
    <div className={classes.root}>
      <TextField
        error={validityOfNewProject}
        id="add-project"
        label="Add Project"
        variant="outlined"
        helperText={validityOfNewProject ? "Project already exists!" : ""}
        onKeyUp={(event) => updateValidityAndAddNewProject(event)}
      />
      <List component="nav" aria-label="project list">
        {list.map((project) => {
          return (
            <div className={classes.listItemContainer} key={project.id}>
              <ListItem
                component={Link}
                to={`/${project.name.toLowerCase()}`}
                className={classes.listItem}
                button
              >
                <ListItemText primary={project.name} />
              </ListItem>
              <Tooltip title="Delete" arrow>
                <IconButton onClick={() => deleteProject(project.id)}>
                  <Delete className={classes.deleteIcon} />
                </IconButton>
              </Tooltip>
            </div>
          );
        })}
      </List>
    </div>
  );
}
