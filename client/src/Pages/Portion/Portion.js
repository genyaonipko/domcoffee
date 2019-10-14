import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';

import AppBarComponent from '../../Components/AppBarComponent';
import FormDialog from '../../Components/SubmitModal';
import { PortionsActions, PortionsSelectors } from '../../Reducers/PortionsReducers';
import SnackBar from '../../Components/SnackBar';

import PortionTabContainer from './Components/PortionTabContainer';
import SpeedDial from '../../Components/SpeedDial';
import EditModal from '../../Components/EditModal';

const APP_BAR_TITLE = 'Порции';
const FORM_DIALOG_TITLE = 'порций';
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

const Portion = ({
  onSubmitPortion,
  getPortion,
  classes,
  errorsPortion,
  selectPortionId,
  onEditPortion,
  data,
}) => {
  const [openSubmitModal, setOpenSubmitModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  useEffect(() => {
    getPortion();
  }, []);

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

  const handleSubmit = values => onSubmitPortion(values);

  const handleEdit = values => {
    onEditPortion(values);
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
          selectIdAction={selectPortionId}
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
    return <PortionTabContainer />;
  };

  const renderSnackBar = () => {
    return (
      <SnackBar
        visible={!!errorsPortion}
        type="error"
        message={errorsPortion}
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

Portion.propTypes = {
  // settings
  classes: PropTypes.shape().isRequired,
  errorsPortion: PropTypes.string.isRequired,

  // function
  getPortion: PropTypes.func.isRequired,
  onSubmitPortion: PropTypes.func.isRequired,
  selectPortionId: PropTypes.func.isRequired,
  onEditPortion: PropTypes.func.isRequired,

  // data
  data: PropTypes.arrayOf().isRequired,
};

const mapStateToProps = createStructuredSelector({
  errorsPortion: PortionsSelectors.selectPortionsError,
  data: PortionsSelectors.selectPortionsData,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getPortion: PortionsActions.getPortionAction,
      onSubmitPortion: PortionsActions.addPortionAction,
      selectPortionId: PortionsActions.Creators.selectPortionId,
      onEditPortion: PortionsActions.editPortionAction,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles, { withTheme: true })(Portion));
