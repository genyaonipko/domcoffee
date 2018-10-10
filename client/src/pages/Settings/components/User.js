import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Divider from '@material-ui/core/Divider';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';

import { getAllUser, deleteUserAction } from '../../../redux/actions/user';

import Alert from '../../../components/Alert';
import Loader from '../../../components/Loader';
import SnackBar from '../../../components/SnackBar';
import UpdateUserForm from '../components/UpdateUserForm';

const styles = () => ({
  user: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'unset',
  },
  userTitle: {
    margin: 0,
    marginLeft: 32,
  },
  button: {
    position: 'fixed',
    bottom: 16,
    right: 16,
  },
  top: {
    display: 'flex',
    alignItems: 'center',
  },
  listWrapper: {
    marginTop: 16,
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingRight: '18%',
  },
  listText: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  listNoneAction: {
    position: 'absolute',
    right: 4,
    padding: 0,
  },
});

class User extends Component {
  state = {
    open: false,
    key: '',
    visible: false,
    openUpdate: false,
  };

  componentDidMount = () => {
    this.props.getAllUser();
  };
  handleClick = () => {
    this.props.history.push('/settings/add-user');
  };

  handleOpen = key => {
    this.setState({ key, open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleDelete = key => {
    this.setState({ visible: true });
    this.props.deleteUser(key);
    setTimeout(() => {
      this.setState({ visible: false });
    }, 3000);
  };

  handleOpenUpdate = key => {
    this.setState({ key, openUpdate: true });
  };

  handleCloseUpdate = () => {
    this.setState({ openUpdate: false });
  };

  render() {
    const { history, classes, users } = this.props;
    const { key, open, visible, openUpdate } = this.state;
    return (
      <div className={classes.user}>
        <div className={classes.top}>
          <Button
            variant="fab"
            color="secondary"
            aria-label="Back"
            onClick={() => history.push('/settings')}>
            <ArrowBack />
          </Button>
          <Typography
            className={classes.userTitle}
            variant="display1"
            gutterBottom>
            Пользователи
          </Typography>
        </div>
        <div className={classes.listWrapper}>
          {users.length ? (
            <List className={classes.list}>
              {users.map(item => (
                <Fragment>
                  <ListItem key={item.email} className={classes.listItem}>
                    <Avatar alt="Remy Sharp" src={item.avatar} />
                    <ListItemText
                      style={{ width: '15%' }}
                      className={classes.listText}
                      primary={item.name}
                    />
                    <ListItemText
                      style={{ width: '35%' }}
                      className={classes.listText}
                      primary={item.email}
                    />
                    <ListItemText
                      style={{ width: '10%' }}
                      className={classes.listText}
                      primary={item.role}
                    />
                    <ListItemText
                      style={{ width: '15%' }}
                      className={classes.listText}
                      primary={item.date.slice(0, 10)}
                    />
                    {item.role !== 'admin' ? (
                      <ListItemSecondaryAction
                        style={{
                          width: 200,
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Tooltip TransitionComponent={Zoom} title="Удалить">
                          <IconButton
                            className={classes.buttonList}
                            aria-label="Delete"
                            onClick={() => this.handleOpen(item.key)}>
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip
                          TransitionComponent={Zoom}
                          title="Редактировать">
                          <IconButton
                            className={classes.buttonList}
                            aria-label="Edit"
                            onClick={() => this.handleOpenUpdate(item.key)}>
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                      </ListItemSecondaryAction>
                    ) : (
                      <ListItemText
                        style={{ width: '15%' }}
                        className={classes.listNoneAction}
                      />
                    )}
                  </ListItem>
                  <Divider light />
                </Fragment>
              ))}
            </List>
          ) : (
            <Loader />
          )}
        </div>
        <Alert
          open={open}
          handleDelete={() => this.handleDelete(key)}
          handleClose={this.handleClose}
        />
        <UpdateUserForm
          open={openUpdate}
          handleClose={this.handleCloseUpdate}
          keyItem={key}
        />
        <SnackBar visible={visible} />
        <Button
          variant="fab"
          color="primary"
          aria-label="Add"
          className={classes.button}
          onClick={this.handleClick}>
          <AddIcon />
        </Button>
      </div>
    );
  }
}

User.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  classes: PropTypes.shape({}).isRequired,
  getAllUser: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  deleteUser: PropTypes.func.isRequired,
};

const mSTP = state => ({
  users: state.users,
});

const mDTP = dispatch => ({
  getAllUser: () => dispatch(getAllUser()),
  deleteUser: key => dispatch(deleteUserAction(key)),
});

export default compose(
  withStyles(styles),
  connect(
    mSTP,
    mDTP,
  ),
)(User);
