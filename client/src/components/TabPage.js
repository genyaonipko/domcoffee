import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import SwipeableViews from 'react-swipeable-views';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { Creators as AdditionalActions } from '../redux/actions/additional/additional';

const styles = () => ({
  rootTabs: {
    flex: 1,
    flexDirection: 'column',
  },
  tabs: {
    width: '100%',
  },
});

const TabContainer = ({ children, dir }) => (
  <Typography component="div" dir={dir}>
    {children}
  </Typography>
);

TabContainer.propTypes = {
  children: PropTypes.shape({}).isRequired,
  dir: PropTypes.string.isRequired,
};

class TabPage extends Component {
  static propTypes = {
    setTabIndex: PropTypes.func.isRequired,
    classes: PropTypes.shape({}).isRequired,
    tabTitles: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    children: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
    theme: PropTypes.shape({}).isRequired,
    tabIndex: PropTypes.number.isRequired,
  };

  handleChange = (event, value) => {
    this.props.setTabIndex(value);
  };

  handleChangeIndex = index => {
    this.props.setTabIndex(index);
  };

  render() {
    const { classes, theme, tabTitles, children, tabIndex } = this.props;
    const childrenArr = React.Children.toArray(children);
    return (
      <div className={classes.rootTabs}>
        <div className={classes.tabs}>
          <Tabs
            value={tabIndex}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth">
            {tabTitles.map(title => (
              <Tab key={`item_${title}`} label={title} />
            ))}
          </Tabs>
        </div>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={tabIndex}
          onChangeIndex={this.handleChangeIndex}>
          {childrenArr.map((child, i) => (
            <TabContainer key={`item_${i + 1}_tab`} dir={theme.direction}>
              {child}
            </TabContainer>
          ))}
        </SwipeableViews>
      </div>
    );
  }
}

const mSTP = state => ({
  tabIndex: state.settings.tabIndex,
});

const mDTP = dispatch => ({
  setTabIndex: index => dispatch(AdditionalActions.setIndexTab(index)),
});

export default compose(
  withStyles(styles),
  connect(
    mSTP,
    mDTP,
  ),
)(TabPage);
