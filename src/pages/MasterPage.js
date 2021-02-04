import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import Home from "./Home";
import Month from "./Month";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import HomeIcon from "@material-ui/icons/Home";

import { Edit, Done } from "@material-ui/icons";

import { toggleEdit } from "../actions";
//import MenuItem from "@material-ui/core/MenuItem";
//import Menu from "@material-ui/core/Menu";

import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textAlign: "center",
  },
  link: {
    color: "inherit",
    lineHeight: "1px",
  },
}));

const MasterPage = ({ toggleEdit, edit }) => {
  const classes = useStyles();

  return (
    <Router>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <IconButton color="inherit">
            <NavLink to="/" className={classes.link}>
              <HomeIcon />
            </NavLink>
          </IconButton>

          <Typography variant="h6" className={classes.title}>
            iMoney
          </Typography>
          <div>
            <IconButton color="inherit" onClick={toggleEdit}>
              {edit.show ? <Done /> : <Edit />}
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Container>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/month/:monthId">
            <Month />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  edit: state.edit,
});

export default connect(mapStateToProps, { toggleEdit })(MasterPage);
