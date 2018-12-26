/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SwipeableViews from 'react-swipeable-views';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { setTabIndex } from '../redux/actions/sidebar';

const styles = theme => ({
  rootTabs: {
    flex: 1,
    flexDirection: 'column',
  },
  tabs: {
    width: '100%',
  },
});

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir}>
      {children}
    </Typography>
  );
}

class TabPage extends Component {
  static propTypes = {
    prop: PropTypes,
  };

  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
    this.props.setTabIndex(value);
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
    this.props.setTabIndex(index);
  };

  render() {
    const { classes, theme, tabTitles, children } = this.props;
    const childrenArr = React.Children.toArray(children);
    return (
      <div className={classes.rootTabs}>
        <div className={classes.tabs}>
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            fullWidth>
            {tabTitles.map(title => (
              <Tab label={title} />
            ))}
          </Tabs>
        </div>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}>
          {childrenArr.map(child => (
            <TabContainer dir={theme.direction}>{child}</TabContainer>
          ))}
        </SwipeableViews>
      </div>
    );
  }
}

const mDTP = dispatch => ({
  setTabIndex: index => dispatch(setTabIndex(index)),
});

export default connect(
  null,
  mDTP,
)(TabPage);
