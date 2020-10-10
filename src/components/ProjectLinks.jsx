import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import { Delete } from "@material-ui/icons";

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
      background: "#6A5EDA",
      color: "white",
    },
  },
  deleteIcon: {
    color: "red",
  },
}));

export default function ProjectLinks(props) {
  const classes = useStyles();

  const { list, addNewProject, deleteProject } = props;
  return (
    <div className={classes.root}>
      <TextField
        id="add-project"
        label="Add Project"
        variant="outlined"
        onKeyUp={addNewProject}
      />
      <List component="nav" aria-label="main mailbox folders">
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
              <IconButton onClick={() => deleteProject(project.id)}>
                <Delete className={classes.deleteIcon} />
              </IconButton>
            </div>
          );
        })}
      </List>
    </div>
  );
}
