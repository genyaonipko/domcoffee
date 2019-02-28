import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
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
import Loader from '../../../components/Loader';

const ListUsers = ({ users, classes, handleOpenUpdate, handleOpen }) => (
  <div className={classes.listWrapper}>
    {users.length ? (
      <List className={classes.list}>
        {users.map(item => (
          <Fragment key={item.email}>
            <ListItem className={classes.listItem}>
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
                      onClick={() => handleOpen(item.key)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip TransitionComponent={Zoom} title="Редактировать">
                    <IconButton
                      className={classes.buttonList}
                      aria-label="Edit"
                      onClick={() => handleOpenUpdate(item.key)}>
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
);

ListUsers.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  classes: PropTypes.shape({}).isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  handleOpenUpdate: PropTypes.func.isRequired,
  handleOpen: PropTypes.func.isRequired,
};

export default ListUsers
