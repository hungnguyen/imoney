import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import { Typography } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { Close, Edit } from "@material-ui/icons";

import NumberFormat from "react-number-format";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import {
  getAllExpense,
  selectMonth,
  deleteExpense,
  selectExpense,
} from "../actions";

import ExpenseModal from "../components/ExpenseModal";
import Loading from "../components/Loading";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(1),
  },
  table: {
    width: "100%",
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing(3),
    right: 0,
    left: 0,
    margin: "0 auto",
    zIndex: 999,
  },
  total: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(3),
  },
  noborder: {
    borderBottom: "none",
  },
}));

function Month({
  expense,
  month,
  getAllExpense,
  selectMonth,
  deleteExpense,
  selectExpense,
  edit,
}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [expenseByMonth, setExpenseByMonth] = React.useState([]);
  const params = useParams();
  const [totalAmount, setTotalAmount] = React.useState(0);
  const [totalRemain, setTotalRemain] = React.useState(0);

  React.useEffect(() => {
    getAllExpense();
  }, [getAllExpense]);

  React.useEffect(() => {
    if (expense.list.length > 0) {
      setExpenseByMonth(
        expense.list.filter((item) => item.monthId === params.monthId)
      );
    }
  }, [expense.list, params.monthId]);

  React.useEffect(() => {
    selectMonth(params.monthId);
  }, [params.monthId, selectMonth]);

  function handleOpen() {
    setOpen(true);
  }
  function handleClose() {
    setOpen(false);
  }
  function handleDelete(e, item) {
    if (window.confirm(`Bạn có muốn xóa ${item.name}?`)) {
      deleteExpense(item._id);
    }
  }
  function handleEdit(e, item) {
    selectExpense(item._id);
    handleOpen();
  }
  function subtotal(items) {
    let total = 0;
    items.forEach((element) => {
      total += parseInt(element.amount.$numberDecimal);
    });
    return total;
  }

  React.useEffect(() => {
    if (expenseByMonth.length > 0) setTotalAmount(subtotal(expenseByMonth));
  }, [expenseByMonth]);

  React.useEffect(() => {
    setTotalRemain(month.item.income?.$numberDecimal - totalAmount);
  }, [totalAmount, month.item]);

  return (
    <div className={classes.root}>
      <Typography variant="h5" gutterBottom align="center">
        Tổng kết
      </Typography>
      <Paper className={classes.total}>
        <Table className={classes.table} aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell align="left" className={classes.noborder}>
                Thu nhập
              </TableCell>
              <TableCell align="right" className={classes.noborder}>
                <Typography style={{ color: "green" }}>
                  <NumberFormat
                    displayType="text"
                    value={month.item.income?.$numberDecimal}
                    thousandSeparator
                  />
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left">Chi tiêu</TableCell>
              <TableCell align="right">
                <Typography style={{ color: "red" }}>
                  <NumberFormat
                    displayType="text"
                    value={totalAmount}
                    thousandSeparator
                  />
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left" className={classes.noborder}>
                Còn lại
              </TableCell>
              <TableCell align="right" className={classes.noborder}>
                <Typography
                  style={{
                    color: totalRemain > 0 ? "green" : "red",
                  }}
                >
                  <NumberFormat
                    displayType="text"
                    value={totalRemain}
                    thousandSeparator
                  />
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
      <Typography variant="h5" gutterBottom align="center">
        Chi tiết
      </Typography>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableBody>
            {expenseByMonth.length > 0 &&
              expenseByMonth.map((row) => (
                <TableRow key={row._id}>
                  <TableCell
                    align="left"
                    style={{ display: edit.show ? "" : "none" }}
                  >
                    <IconButton
                      edge="end"
                      onClick={(e) => handleDelete(e, row)}
                      size="small"
                    >
                      <Close fontSize="small" />
                    </IconButton>
                    <IconButton
                      edge="end"
                      onClick={(e) => handleEdit(e, row)}
                      size="small"
                    >
                      <Edit fontSize="small" />
                    </IconButton>
                  </TableCell>
                  <TableCell component="th" scope="row" align="left">
                    {row.name}
                  </TableCell>
                  <TableCell component="th" scope="row" align="right">
                    <NumberFormat
                      value={row.amount.$numberDecimal}
                      thousandSeparator
                      displayType={"text"}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ExpenseModal
        open={open}
        onClose={handleClose}
        monthId={month.item?._id}
      />
      <Loading open={expense.loading || month.loading} />
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
  expense: state.expense,
  month: state.month,
  edit: state.edit,
});

export default connect(mapStateToProps, {
  getAllExpense,
  selectMonth,
  deleteExpense,
  selectExpense,
})(Month);
