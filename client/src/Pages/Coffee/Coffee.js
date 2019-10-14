import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';

import AppBarComponent from '../../Components/AppBarComponent';
import FormDialog from '../../Components/SubmitModal';
import { CoffeeActions, CoffeeSelectors } from '../../Reducers/CoffeeReducers';
import SnackBar from '../../Components/SnackBar';

import CoffeeTabContainer from './Components/CoffeeTabContainer';
import SpeedDial from '../../Components/SpeedDial';
import EditModal from '../../Components/EditModal';

const APP_BAR_TITLE = 'Помол';
const FORM_DIALOG_TITLE = 'помола';
const EDIT_MODAL_TITLE = 'Процесс изменения данных';
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
    paddingTop: theme.spacing(28),
  },
});

const Coffee = ({
  onSubmitCoffee,
  getCoffee,
  tabIndex,
  classes,
  errorsCoffee,
  selectCoffeeId,
  onEditCoffee,
  data,
}) => {
  const [openSubmitModal, setOpenSubmitModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  useEffect(() => {
    getCoffee();
  }, []);

  const getModalTitle = !tabIndex ? 'coffee' : 'degustation';

  const handleClickOpen = () => {
    setOpenSubmitModal(true);
  };

  const handleClose = () => {
    setOpenSubmitModal(false);
  };

  const handleOpenEditModal = () => {
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  const handleSubmit = values => onSubmitCoffee(values);

  const handleEdit = values => {
    onEditCoffee(values);
  };

  const renderFormDialog = () => {
    return (
      <>
        <FormDialog
          onSubmit={handleSubmit}
          open={openSubmitModal}
          handleClose={handleClose}
          title={FORM_DIALOG_TITLE}
        />
        <EditModal
          onSubmit={handleEdit}
          open={openEditModal}
          handleClose={handleCloseEditModal}
          dataTitle={getModalTitle}
          selectIdAction={selectCoffeeId}
          title={EDIT_MODAL_TITLE}
          data={data}
        />
      </>
    );
  };

  const renderFabButton = () => {
    return (
      <SpeedDial addAction={handleClickOpen} editAction={handleOpenEditModal} />
    );
  };

  const renderContent = () => {
    return <CoffeeTabContainer />;
  };

  const renderSnackBar = () => {
    return (
      <SnackBar
        visible={!!errorsCoffee}
        type="error"
        message={errorsCoffee}
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

Coffee.propTypes = {
  // settings
  classes: PropTypes.shape().isRequired,
  tabIndex: PropTypes.number.isRequired,
  errorsCoffee: PropTypes.string.isRequired,

  // function
  getCoffee: PropTypes.func.isRequired,
  onSubmitCoffee: PropTypes.func.isRequired,
  selectCoffeeId: PropTypes.func.isRequired,
  onEditCoffee: PropTypes.func.isRequired,

  // data
  data: PropTypes.arrayOf().isRequired,
};

const mapStateToProps = createStructuredSelector({
  errorsCoffee: CoffeeSelectors.selectCoffeeError,
  data: CoffeeSelectors.selectCoffeeData,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getCoffee: CoffeeActions.getCoffeeAction,
      onSubmitCoffee: CoffeeActions.addCoffeeAction,
      selectCoffeeId: CoffeeActions.Creators.selectCoffeeId,
      onEditCoffee: CoffeeActions.editCoffeeAction,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles, { withTheme: true })(Coffee));
