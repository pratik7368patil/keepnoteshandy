import React from "react";
import "./project.css";
import List from "./List";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

function Project(props) {
  const { project, addElement, onDelete, onDone } = props;

  return (
    <div>
      <Typography variant="h4">
        <Box fontWeight="fontWeightBold" m={2} mb={4}>
          {project.name}
        </Box>
      </Typography>
      <List
        myList={project}
        onEnter={addElement}
        onDelete={onDelete}
        onDone={onDone}
      />
    </div>
  );
}

export default Project;
