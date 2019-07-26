import React from 'react';
import PropTypes from 'prop-types';
import ListItemWrapper from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Error from '@material-ui/icons/Error';

const ListItem = ({ title, onClick, icon: Icon, styles }) => {
  return (
    <>
      <ListItemWrapper style={styles} button onClick={onClick}>
        <ListItemIcon>
          <Icon />
        </ListItemIcon>
        <ListItemText primary={title} />
      </ListItemWrapper>
      <Divider />
    </>
  )
};

ListItem.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.shape({}),
  styles: PropTypes.shape({}),
};

ListItem.defaultProps = {
  icon: Error,
  styles: null,
}

export default ListItem;
