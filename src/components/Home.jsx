import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  main: {
    width: "100%",
    backgroundImage:
      "linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(https://picsum.photos/900/600)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "100%",
    color: "white",
    padding: "0px 30px 0px 30px",
    borderRadius: 0,
  },
  mainContainer: {
    height: "100%",
  },
  alignToCenter: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    height: "100%",
  },
}));

export default function Home() {
  const classes = useStyles();
  return (
    <Paper className={classes.main} elevation={0}>
      <Grid container className={classes.mainContainer}>
        <Grid item sm={6} className={classes.alignToCenter}>
          <Box mb={4}>
            <Typography variant="h3">
              <Box fontWeight="fontWeightBold">
                Manage your to do list like a pro!
              </Box>
            </Typography>
          </Box>
          <Box mb={4}>
            <Typography variant="body1">
              This app will help you to keep to do list organized, manage your
              tasks, projects and many more so you don't miss anything!
            </Typography>
          </Box>
        </Grid>
        <Grid item sm={6}></Grid>
      </Grid>
    </Paper>
  );
}
