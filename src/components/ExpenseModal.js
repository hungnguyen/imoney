import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogTitle from "@material-ui/core/DialogTitle";

import { connect } from "react-redux";
import { updateExpense, createExpense } from "../actions";

import NumberFormat from "react-number-format";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      marginBottom: theme.spacing(2),
    },
  },
}));

function ExpenseModal({
  open,
  onClose,
  expense,
  updateExpense,
  createExpense,
  monthId,
}) {
  const classes = useStyles();
  const init = {
    name: "",
    amount: 0,
    monthId,
  };
  const [updateObj, setUpdateObj] = React.useState(init);

  React.useEffect(() => {
    if (expense.item._id || (expense.item._id && updateObj._id === undefined)) {
      setUpdateObj(expense.item);
    }
  }, [expense.item, setUpdateObj, updateObj._id]);

  const resetForm = () => {
    setUpdateObj(init);
  };
  const handleSave = () => {
    if (expense.item._id) {
      updateExpense({
        id: expense.item._id,
        body: updateObj,
      });
    } else {
      createExpense(updateObj);
    }
    resetForm();
    onClose();
  };
  const handleClose = () => {
    resetForm();
    onClose();
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    setUpdateObj({ ...updateObj, [name]: value });
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
      >
        <DialogTitle id="alert-dialog-title">Đầu mục chi tiêu</DialogTitle>
        <DialogContent>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              name="name"
              label="Chi phí"
              type="text"
              value={updateObj.name}
              onChange={handleChange}
              fullWidth
            />

            <NumberFormat
              value={updateObj.amount.$numberDecimal || updateObj.amount}
              customInput={TextField}
              thousandSeparator
              label="Số tiền"
              fullWidth
              onValueChange={(values) => {
                handleChange({
                  target: {
                    name: "amount",
                    value: values.value,
                  },
                });
              }}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Hủy
          </Button>
          <Button onClick={handleSave} color="primary" autoFocus>
            Lưu
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapStateToProps = (state) => ({
  expense: state.expense,
});

export default connect(mapStateToProps, {
  updateExpense,
  createExpense,
})(ExpenseModal);
