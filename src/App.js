import React, { Component } from "react";
import TaskList from "./components/TaskList";
import FormDialog from "./components/AddTask";
import EditDialog from "./components/EditTask";
import { OPEN_FORM } from "./constants/action-types";
import store from "./store/index";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
window.store = store;

class AppComponent extends Component {
  openDialog = () => {
    store.dispatch({
      type: OPEN_FORM
    });
  };

  render() {
    return (
      <div>
        <TaskList />

        <FormDialog />
        <EditDialog />

        <Button
          variant="fab"
          style={{
            position: "absolute",
            bottom: 10,
            right: 10
          }}
          onClick={this.openDialog}
          color="secondary"
        >
          <AddIcon />
        </Button>
      </div>
    );
  }
}

export default AppComponent;
