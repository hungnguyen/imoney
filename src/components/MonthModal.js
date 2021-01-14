import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogTitle from "@material-ui/core/DialogTitle";

import { connect } from "react-redux";
import { updateMonth, createMonth } from "../actions";

import NumberFormat from "react-number-format";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      marginBottom: theme.spacing(2),
    },
  },
}));

function MonthModal({ open, onClose, month, updateMonth, createMonth }) {
  const classes = useStyles();
  const date = new Date();
  const init = {
    name: `Chi tiêu tháng ${date.getMonth() + 1}`,
    income: 0,
    year: date.getFullYear(),
  };
  const [updateObj, setUpdateObj] = React.useState(init);

  React.useEffect(() => {
    if (month.item._id || (month.item._id && updateObj._id === undefined)) {
      setUpdateObj(month.item);
    }
  }, [month.item, setUpdateObj, updateObj._id]);

  const resetForm = () => {
    setUpdateObj(init);
  };
  const handleSave = () => {
    if (month.item._id) {
      updateMonth({
        id: month.item._id,
        body: updateObj,
      });
    } else {
      createMonth(updateObj);
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
        <DialogTitle id="alert-dialog-title">Bảng chi tiêu tháng</DialogTitle>
        <DialogContent>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              name="name"
              label="Tiêu đề"
              type="text"
              value={updateObj.name}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="year"
              label="Năm"
              type="text"
              value={updateObj.year}
              onChange={handleChange}
              fullWidth
            />
            <NumberFormat
              value={updateObj.income.$numberDecimal || updateObj.income}
              customInput={TextField}
              thousandSeparator
              label="Thu nhập"
              fullWidth
              onValueChange={(values) => {
                handleChange({
                  target: {
                    name: "income",
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
  month: state.month,
});

export default connect(mapStateToProps, {
  updateMonth,
  createMonth,
})(MonthModal);
