import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBarComponent from '../../Components/AppBarComponent';
import ListSettings from './components/ListSettings';
import User from './components/User';
import Register from './components/Register';
import EditList from '../EditList';

const styles = theme => ({
  root: {
    flex: 1,
    width: window.innerWidth - 240,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
    paddingTop: 88,
  },
});

class Settings extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <AppBarComponent title="Настройки" />
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Switch>
              <Route exact path="/settings" component={ListSettings} />
              <Route exact path="/settings/users" component={User} />
              <Route exact path="/settings/add-user" component={Register} />
              <Route exact path="/settings/edit" component={EditList} />
            </Switch>
          </main>
        </div>
      </React.Fragment>
    );
  }
}

Settings.propTypes = {
  classes: PropTypes.shape().isRequired,
};

export default withStyles(styles)(Settings);
