import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Typography from "@material-ui/core/Typography";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    margin: "10px 10px 10px 0px",
    maxWidth: 360,
    width: 360,
    borderTop: "3px solid #6596FF",
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
    color: "#2B2B2B",
    "&:hover": {
      color: "red",
    },
  },
  doneBtn: {
    color: "#228b22",
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
          <Tooltip title={item.isComplete ? "In Process" : "Done"} arrow>
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
          </Tooltip>
          <Tooltip title="Delete" arrow>
            <IconButton
              aria-label="delete"
              onClick={() => onDelete(item.id, projectId)}
            >
              <DeleteIcon className={classes.delBtn} />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </Card>
  );
}
