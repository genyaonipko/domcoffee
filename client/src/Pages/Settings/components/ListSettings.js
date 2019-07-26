import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PersonAdd from '@material-ui/icons/PersonAdd';
import ShowChart from '@material-ui/icons/ShowChart';
import List from '../../../Components/List';
import ListItem from '../../../Components/ListItem';
import * as authSelectors from '../../../Redux/reducers/authReducer/selectors';

const ListSettings = ({ history }) => (
  <List title="Настройки">
    <ListItem icon={PersonAdd} title="Пользователи" onClick={() => history.push('/settings/users')} />
    <ListItem icon={ShowChart} title="Изменить данные" onClick={() => history.push('/settings/edit')} />
  </List>
);

ListSettings.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mSTP = createStructuredSelector({
  role: authSelectors.selectRole,
});

export default connect(mSTP)(ListSettings);
