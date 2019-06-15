import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonAdd from '@material-ui/icons/PersonAdd';
import Divider from '@material-ui/core/Divider';
import * as authSelectors from '../../../Redux/reducers/authReducer/selectors';

const ListSettings = ({ history }) => (
  <List component="nav">
    <Fragment>
      <ListItem button onClick={() => history.push('/settings/users')}>
        <ListItemIcon>
          <PersonAdd />
        </ListItemIcon>
        <ListItemText primary="Пользователи" />
      </ListItem>
      <Divider />
    </Fragment>
  </List>
);

ListSettings.propTypes = {
  history: PropTypes.shape({}).isRequired,
};

const mSTP = createStructuredSelector({
  role: authSelectors.selectRole,
});

export default connect(mSTP)(ListSettings);
