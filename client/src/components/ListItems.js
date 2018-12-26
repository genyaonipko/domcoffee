import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import CoffeeIcon from '@material-ui/icons/LocalCafe';
import BarChartIcon from '@material-ui/icons/BarChart';
import PeopleIcon from '@material-ui/icons/People';
import SettingsIcon from '@material-ui/icons/Settings';
import AssignmentIcon from '@material-ui/icons/Assignment';
import history from '../utils/history';

export const MainListItems = ({ role }) => (
  <div>
    <ListItem button onClick={() => history.push('/dashboard')}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Дашбоард" />
    </ListItem>
    <ListItem button onClick={() => history.push('/packs')}>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Пачки" />
    </ListItem>
    <ListItem button onClick={() => history.push('/sales')}>
      <ListItemIcon>
        <CoffeeIcon />
      </ListItemIcon>
      <ListItemText primary="Продажи" />
    </ListItem>
    <ListItem button onClick={() => history.push('/inner')}>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Внутреннее" />
    </ListItem>
    <ListItem button onClick={() => history.push('/own')}>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Личное" />
    </ListItem>
    {role === 'admin' && (
      <ListItem button onClick={() => history.push('/settings')}>
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Настройки" />
      </ListItem>
    )}
  </div>
);

MainListItems.propTypes = {
  role: PropTypes.string.isRequired,
};

export const SecondaryListItems = props => (
  <div>
    <ListSubheader inset>Период</ListSubheader>
    <ListItem button onClick={() => props.changeDay()}>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="День" />
    </ListItem>
    <ListItem button onClick={() => props.changeMonth()}>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Месяц" />
    </ListItem>
    <ListItem button onClick={() => props.changeQuarter()}>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Квартал" />
    </ListItem>
    <ListItem button onClick={() => props.changeYear()}>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Год" />
    </ListItem>
    <ListItem button onClick={() => props.getAll()}>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Все время" />
    </ListItem>
  </div>
);

SecondaryListItems.propTypes = {
  changeMonth: PropTypes.func.isRequired,
  changeDay: PropTypes.func.isRequired,
  changeQuarter: PropTypes.func.isRequired,
  changeYear: PropTypes.func.isRequired,
  getAll: PropTypes.func.isRequired,
};
