import React from "react";
import ListItem from "./ListItem";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  mainField: {
    margin: 10,
  },
  nothing: {
    fontSize: 28,
    color: "royalblue",
    margin: 20,
  },
}));

export default function List(props) {
  const classes = useStyles();
  const { myList, onEnter, onDelete, onDone } = props;
  return (
    <div className={classes.mainField}>
      <TextField
        id="add-task"
        label="Add Task"
        variant="outlined"
        onKeyUp={(event) => onEnter(event, myList.id)}
      />
      {myList.project.length > 0 ? (
        myList.project.map((item) => {
          return (
            <ListItem
              key={item.id}
              item={item}
              onDelete={onDelete}
              onDone={onDone}
              projectId={myList.id}
            />
          );
        })
      ) : (
        <div className={classes.nothing}>Nothing To Do!</div>
      )}
    </div>
  );
}