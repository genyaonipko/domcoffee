/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import CoffeeIcon from '@material-ui/icons/LocalCafe';
import BarChartIcon from '@material-ui/icons/BarChart';
import PeopleIcon from '@material-ui/icons/People';
import SettingsIcon from '@material-ui/icons/Settings';
import history from '../../../utils/history';

export const MainListItems = ({ role, changeTabBar }) => (
  <div>
    <ListItem
      button
      onClick={() => {
        changeTabBar()
        history.push('/dashboard');
      }}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Дашбоард" />
    </ListItem>
    <ListItem
      button
      onClick={() => {
        changeTabBar()
        history.push('/packs');
      }}>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Пачки" />
    </ListItem>
    <ListItem
      button
      onClick={() => {
        changeTabBar()
        history.push('/coffee');
      }}>
      <ListItemIcon>
        <CoffeeIcon />
      </ListItemIcon>
      <ListItemText primary="Помол" />
    </ListItem>
    <ListItem
      button
      onClick={() => {
        changeTabBar()
        history.push('/portion');
      }}>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Порции" />
    </ListItem>
    <ListItem
      button
      disabled
      onClick={() => {
        changeTabBar()
        history.push('/inner');
      }}>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Персонал" />
    </ListItem>
    <ListItem
      button
      disabled
      onClick={() => {
        changeTabBar()
        history.push('/own');
      }}>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Личное" />
    </ListItem>
    {role === 'admin' && (
      <ListItem button onClick={() => {
        changeTabBar()
        history.push('/settings');
      }}>
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
  changeTabBar: PropTypes.func.isRequired,
};
