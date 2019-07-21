import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AddIcon from '@material-ui/icons/Add';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';

import AppBarComponent from '../../Components/AppBarComponent';
import FormDialog from '../../Components/SubmitModal';
import SalesActions from '../../Redux/actions/sales';
import SnackBar from '../../Components/SnackBar';

import * as SalesSelectors from '../../Redux/reducers/salesReducers/selectors';
import { additionalSelectors } from '../../Redux/reducers/additionalReducer';

import CoffeeTabContainer from './Components/CoffeeTabContainer';
import PortionTabContainer from './Components/PortionTabContainer';
import TabPages from '../../Components/TabPage';

const TAB_TITLES = ['Помол', 'Порции'];
const APP_BAR_TITLE = 'Продажи';
const FORM_DIALOG_TITLE = 'продаж';
const SIDEBAR_WIDTH = 240;

const styles = theme => ({
  root: {
    display: 'flex',
    flex: 1,
    width: window.innerWidth - SIDEBAR_WIDTH,
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
    paddingTop: theme.spacing(16),
  },
  button: {
    position: 'fixed',
    right: theme.spacing(4),
    bottom: theme.spacing(4),
  },
});

const Sales = ({
  onSubmitCoffee,
  onSubmitPortions,
  getCoffee,
  getPortion,
  tabIndex,
  classes,
  errorsCoffee,
  errorsPortion,
  ...props
}) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getCoffee();
    getPortion();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = values => {
    if (!tabIndex) {
      onSubmitCoffee(values);
    } else {
      onSubmitPortions(values);
    }
  };

  const renderFormDialog = () => {
    return (
      <FormDialog
        onSubmit={handleSubmit}
        open={open}
        handleClose={handleClose}
        title={FORM_DIALOG_TITLE}
      />
    );
  };

  const renderFabButton = () => {
    return (
      <Fab
        color="secondary"
        aria-label="Add"
        className={classes.button}
        onClick={handleClickOpen}>
        <AddIcon />
      </Fab>
    );
  };

  const renderContent = () => {
    return (
      <TabPages classes={classes} tabTitles={TAB_TITLES} {...props}>
        <CoffeeTabContainer />
        <PortionTabContainer />
      </TabPages>
    );
  };

  const renderSnackBar = () => {
    return (
      <SnackBar
        visible={!!errorsCoffee || !!errorsPortion}
        type="error"
        message={errorsCoffee || errorsPortion}
      />
    );
  };

  return (
    <>
      <CssBaseline />
      <div className={classes.root}>
        <AppBarComponent title={APP_BAR_TITLE} />
        <main className={classes.content}>{renderContent()}</main>
        {renderFabButton()}
        {renderFormDialog()}
        {renderSnackBar()}
      </div>
    </>
  );
};

Sales.propTypes = {
  // settings
  classes: PropTypes.shape().isRequired,
  tabIndex: PropTypes.number.isRequired,
  errorsCoffee: PropTypes.string.isRequired,
  errorsPortion: PropTypes.string.isRequired,

  // function
  getCoffee: PropTypes.func.isRequired,
  getPortion: PropTypes.func.isRequired,
  onSubmitCoffee: PropTypes.func.isRequired,
  onSubmitPortions: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  tabIndex: additionalSelectors.selectTabIndex,
  errorsCoffee: SalesSelectors.selectCoffeeError,
  errorsPortion: SalesSelectors.selectPortionError,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getCoffee: SalesActions.getCoffeeAction,
      getPortion: SalesActions.getPortionAction,
      onSubmitCoffee: SalesActions.addCoffeeAction,
      onSubmitPortions: SalesActions.addPortionAction,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles, { withTheme: true })(Sales));
