import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { withStyles } from '@material-ui/core/styles';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';

import UsersActions from '../../../redux/actions/users/user';
import { additionalSelectors } from '../../../redux/reducers/additionalReducer';

import Alert from '../../../components/Alert';
import SnackBar from '../../../components/SnackBar';
import UpdateUserForm from './UpdateUserForm';
import ListUsers from './ListUsers';

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
          <Fab
            color="secondary"
            aria-label="Back"
            onClick={() => history.push('/settings')}>
            <ArrowBack />
          </Fab>
          <Typography className={classes.userTitle} variant="h4" gutterBottom>
            Пользователи
          </Typography>
        </div>
        <ListUsers
          users={users}
          classes={classes}
          handleOpenUpdate={this.handleOpenUpdate}
          handleOpen={this.handleOpen}
        />
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
        <Fab
          color="primary"
          aria-label="Add"
          className={classes.button}
          onClick={this.handleClick}>
          <AddIcon />
        </Fab>
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

// const mSTP = createStructuredSelector({
//   users: selectDegustationForChart,
// });

const mDTP = dispatch =>
  bindActionCreators(
    {
      getAllUser: UsersActions.getAllUser,
      deleteUser: UsersActions.deleteUserAction,
    },
    dispatch,
  );

const mSTP = createStructuredSelector({
  users: additionalSelectors.selectUsers,
});

export default compose(
  withStyles(styles),
  connect(
    mSTP,
    mDTP,
  ),
)(User);
