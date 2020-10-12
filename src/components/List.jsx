import React from "react";
import ListItem from "./ListItem";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

const useStyles = makeStyles(() => ({
  mainField: {
    margin: 10,
  },
  nothing: {
    fontSize: 28,
    color: "#6596FF",
    margin: 20,
  },
}));

export default function List(props) {
  const classes = useStyles();
  const { newProjectList, onEnter, onDelete, onDone } = props;

  const [toogleSearch, setToogleSearch] = React.useState(false);

  const onToogleSearch = () => {
    setToogleSearch(!toogleSearch);
  };

  const [searchData, setSearchData] = React.useState("");

  const updateSearchData = (event) => {
    setSearchData(event.target.value);
  };

  const filteredBySearchList = newProjectList.project.filter((item) => {
    if (item.content.toLowerCase().includes(searchData.toLowerCase())) {
      return item;
    } else {
      return null;
    }
  });

  return (
    <div className={classes.mainField}>
      <TextField
        id="add-task"
        label={toogleSearch ? "Search..." : "Add Task"}
        variant="outlined"
        size="small"
        onKeyUp={(event) =>
          toogleSearch
            ? updateSearchData(event)
            : onEnter(event, newProjectList.id)
        }
      />
      <FormControl component="fieldset">
        <FormGroup aria-label="position" row>
          <FormControlLabel
            value="Search"
            control={<Switch color="primary" onChange={onToogleSearch} />}
            label="Search"
            labelPlacement="start"
          />
        </FormGroup>
      </FormControl>
      {filteredBySearchList.length > 0 ? (
        filteredBySearchList.map((item) => {
          return (
            <ListItem
              key={item.id}
              item={item}
              onDelete={onDelete}
              onDone={onDone}
              projectId={newProjectList.id}
            />
          );
        })
      ) : (
        <div className={classes.nothing}>Nothing To Do!</div>
      )}
    </div>
  );
}
