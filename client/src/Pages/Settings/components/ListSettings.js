import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PersonAdd from '@material-ui/icons/PersonAdd';
import List from '../../../Components/List';
import ListItem from '../../../Components/ListItem';
import { AuthSelectors } from '../../../Reducers/AuthReducers';

const ListSettings = ({ history }) => (
  <List title="Настройки">
    <ListItem icon={PersonAdd} title="Пользователи" onClick={() => history.push('/settings/users')} />
  </List>
);

ListSettings.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mSTP = createStructuredSelector({
  role: AuthSelectors.selectRole,
});

export default connect(mSTP)(ListSettings);
