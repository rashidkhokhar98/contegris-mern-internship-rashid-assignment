import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import store from "../store/index";
import IconButton from "@material-ui/core/IconButton";
import CommentIcon from "@material-ui/icons/Edit";
import Comment from "@material-ui/icons/Error";
import { OPEN_EDIT_FORM } from "../constants/action-types";
import { SELECT_ARTICLE } from "../constants/action-types";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import AccountCircle from "@material-ui/icons/Delete";

import Button from "@material-ui/core/Button";
import ArrowDropDownTwoToneIcon from '@material-ui/icons/ArrowDropDownTwoTone';

import { DELETE_ARTICLE } from "../constants/action-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";


window.store = store;


const styles = theme => ({
  root: {
    width: "100%",
    height: 360,
    backgroundColor: theme.palette.background.paper
  },
  avatar: {
    color: "#fff",
    backgroundColor: "#F00"
  }
});
var data = [];

class TaskList extends React.Component {
  state = {
    checked: [],
    items: [],
    cmpTask: [],
  };

  openEditDialog = value => {
    console.log("Edit");
    store.dispatch({
      type: OPEN_EDIT_FORM,
      payload: value
    });
  };

  componentDidMount() {
    this.setState({
      items: store.getState()["articles"],
      checked: store.getState()["uiState"]["checked"]
    });

    store.subscribe(() => {
      this.setState({
        items: store.getState()["articles"],
        checked: store.getState()["uiState"]["checked"]
      });
    });
  }

  // App Bar function start

  handleDelete = (value) => {
      data.push(value)
    localStorage.setItem('completed_task', JSON.stringify(data))
    store.dispatch({
      type: DELETE_ARTICLE
    });
  };
  showTask = () =>{
    
    data = JSON.parse(localStorage.getItem('completed_task'));
    this.setState({ cmpTask: data})
  }
  // App bar function end

  handleToggle = value => () => {
    console.log("Select----------" + value);

    store.dispatch({
      type: SELECT_ARTICLE,
      payload: value
    });
  };

  render() {
    const { classes } = this.props;

    return (

      <div>
      {/*BAR */}
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="title" color="secondary"  className="capitalize" >
            Todo List
          </Typography>
        </Toolbar>
      </AppBar>


      <div className={classes.root}>
        {this.state.items.length === 0 ? (
          <Card>
            <CardContent>
              <Comment />
              <Typography color="headline">No Data</Typography>
            </CardContent>
          </Card>
        ) : (
          <List>
            {this.state.items && this.state.items.map((value, index) => (
              <ListItem
                key={value.id}
                dense
                button
                className={classes.listItem}
              >
                <Checkbox
                  onChange={this.handleToggle(value.id)}
                  checked={this.state.checked.indexOf(value.id) !== -1}
                />

                <ListItemText primary={value.title} secondary={value.date} />

                <ListItemSecondaryAction>
                  
        {/* Delete method */}
                {(this.state.checked.length !== 0) ? (
            <IconButton onClick={() => this.handleDelete(value)} color="inherit">
              <AccountCircle />
            </IconButton>
          ) : null}

          

                  <IconButton
                    aria-label="Comments"
                    onClick={() => this.openEditDialog(value)}
                  >
                    <CommentIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        )}

        
        <Button onClick={this.showTask} 
        color="secondary"
        variant="fab"
         
        
        > 
        
        <ArrowDropDownTwoToneIcon aria-label="completed task"/>
        </Button>
        <List>
          {this.state.cmpTask && this.state.cmpTask.map(
            (item) => <ListItem
             style={{textDecoration: "line-through"}}>
              {item.title + item.date}
              </ListItem>)}
  
        </List>
        
      </div>
      </div>
    );
  }
}

TaskList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TaskList);
