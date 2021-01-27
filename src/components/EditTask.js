import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import store from "../store/index";
import { CLOSE_EDIT_FORM } from "../constants/action-types";
import { UPDATE_ARTICLE } from "../constants/action-types";
window.store = store;

export default class EditTask extends React.Component {
  state = {
    open: false,
    article: {
      title: "",
      id: 0,
      date: ""
    }
  };

  handleClose = () => {
    store.dispatch({
      type: CLOSE_EDIT_FORM
    });
  };

  handleChange = name => event => {
    console.log("New Value " + event.target.value);
    this.setState({
      newTitle: event.target.value
    });
  };

  handleSave = () => {
    store.dispatch({
      type: UPDATE_ARTICLE,
      payload: {
        title: this.state.newTitle,
        id: this.state.article.id,
        date: this.state.article.date
      }
    });

    store.dispatch({
      type: CLOSE_EDIT_FORM
    });
  };

  componentDidMount() {
    this.setState({
      open: store.getState()["uiState"]["openEditDialog"],
      article: store.getState()["uiState"]["articleToEdit"]
    });

    store.subscribe(() => {
      console.log(
        "Edit Form Dialog State" + JSON.stringify(store.getState()["uiState"])
      );
      this.setState({
        open: store.getState()["uiState"]["openEditDialog"],
        article: store.getState()["uiState"]["articleToEdit"]
      });
    });
  }

  render() {
    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add Description</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Task"
              multiline
              defaultValue={this.state.article.title}
              rowsMax="4"
              rows="4"
              fullWidth
              onChange={this.handleChange("multiline")}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSave} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
