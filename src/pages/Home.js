import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";

import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import IconButton from "@material-ui/core/IconButton";

import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { Close, Edit } from "@material-ui/icons";
import NavigateNext from "@material-ui/icons/NavigateNext";

import { connect } from "react-redux";
import { getAllMonth, deleteMonth, selectMonth } from "../actions";
import MonthModal from "../components/MonthModal";
import Loading from "../components/Loading";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(1),
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing(3),
    right: 0,
    left: 0,
    margin: "0 auto",
    zIndex: 999,
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
}));

function Home({ month, getAllMonth, deleteMonth, selectMonth, edit }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    getAllMonth();
  }, [getAllMonth]);

  const handleDelete = (e, item) => {
    if (window.confirm(`Bạn có muốn xóa ${item.name}?`)) {
      deleteMonth(item._id);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  function handleEdit(e, item) {
    selectMonth(item._id);
    handleOpen();
  }
  return (
    <div className={classes.root}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table" size="small">
          <TableBody>
            {month.list.length > 0 &&
              month.list.map((row) => (
                <TableRow key={row._id}>
                  <TableCell
                    align="left"
                    style={{ display: edit.show ? "" : "none" }}
                  >
                    <IconButton
                      edge="end"
                      onClick={(e) => handleDelete(e, row)}
                    >
                      <Close />
                    </IconButton>
                    <IconButton edge="end" onClick={(e) => handleEdit(e, row)}>
                      <Edit />
                    </IconButton>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <NavLink to={`/month/${row._id}`} className={classes.link}>
                      {row.name}
                    </NavLink>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton edge="end" aria-label="comments">
                      <NavigateNext />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <MonthModal open={open} onClose={handleClose} />
      <Loading open={month.loading} />
      <Fab
        aria-label="Add"
        className={classes.fab}
        color="primary"
        onClick={handleOpen}
      >
        <AddIcon />
      </Fab>
    </div>
  );
}

const mapStateToProps = (state) => ({
  month: state.month,
  edit: state.edit,
});

export default connect(mapStateToProps, {
  getAllMonth,
  deleteMonth,
  selectMonth,
})(Home);
