import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Typography from "@material-ui/core/Typography";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";

const getRamdomColor = () => {
  const colors = [
    "#E16186",
    "#6CD569",
    "#6596FF",
    "#E2A13B",
    "#E67679",
    "#7ABBCE",
  ];
  const getIndex = (Math.random() * colors.length).toFixed();
  return `3px solid ${colors[getIndex]}`;
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    margin: "10px 10px 10px 0px",
    maxWidth: 360,
    width: 360,
    borderTop: getRamdomColor(),
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    wordWrap: "break-word",
  },
  cover: {
    width: 151,
  },
  complete: {
    textDecoration: "line-through",
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
  },
  delBtn: {
    color: "red",
  },
  doneBtn: {
    color: "green",
  },
}));

export default function ListItem(props) {
  const classes = useStyles();
  const { projectId, item, onDelete, onDone } = props;

  return (
    <Card className={classes.root} variant="outlined">
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography variant="body1" color="textSecondary">
            Task Details
          </Typography>
          <Typography
            component="h6"
            className={item.isComplete ? classes.complete : null}
            variant="h6"
          >
            {item.content}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {item.isComplete ? "Completed!" : null}
          </Typography>
        </CardContent>
        <div className={classes.controls}>
          <IconButton
            aria-label="done"
            onClick={() => onDone(item.id, projectId)}
          >
            {item.isComplete ? (
              <CheckCircleIcon className={classes.doneBtn} />
            ) : (
              <RadioButtonUncheckedIcon />
            )}
          </IconButton>
          <IconButton
            aria-label="delete"
            onClick={() => onDelete(item.id, projectId)}
          >
            <DeleteIcon className={classes.delBtn} />
          </IconButton>
        </div>
      </div>
    </Card>
  );
}
