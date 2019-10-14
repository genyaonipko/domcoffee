import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';

import AppBarComponent from '../../Components/AppBarComponent';
import FormDialog from '../../Components/SubmitModal';
import { PacksActions, PacksSelectors } from '../../Reducers/PacksReducers';
import SnackBar from '../../Components/SnackBar';

import PacksTabContainer from './Components/PacksTabContainer';
import SpeedDial from '../../Components/SpeedDial';
import EditModal from '../../Components/EditModal';

const APP_BAR_TITLE = 'Пачки';
const FORM_DIALOG_TITLE = 'пачек';
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

const Packs = ({
  onSubmitPacks,
  getPacks,
  tabIndex,
  classes,
  errorsPacks,
  selectPackId,
  onEditPack,
  data,
}) => {
  const [openSubmitModal, setOpenSubmitModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  useEffect(() => {
    getPacks();
  }, []);

  const getModalTitle = !tabIndex ? 'packs' : 'degustation';

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

  const handleSubmit = values => onSubmitPacks(values);

  const handleEdit = values => {
    onEditPack(values);
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
          selectIdAction={selectPackId}
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
    return <PacksTabContainer />;
  };

  const renderSnackBar = () => {
    return (
      <SnackBar
        visible={!!errorsPacks}
        type="error"
        message={errorsPacks}
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

Packs.propTypes = {
  // settings
  classes: PropTypes.shape().isRequired,
  tabIndex: PropTypes.number.isRequired,
  errorsPacks: PropTypes.string.isRequired,

  // function
  getPacks: PropTypes.func.isRequired,
  onSubmitPacks: PropTypes.func.isRequired,
  selectPackId: PropTypes.func.isRequired,
  onEditPack: PropTypes.func.isRequired,

  // data
  data: PropTypes.arrayOf().isRequired,
};

const mapStateToProps = createStructuredSelector({
  errorsPacks: PacksSelectors.selectPacksError,
  data: PacksSelectors.selectPacksData,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getPacks: PacksActions.getPackAction,
      onSubmitPacks: PacksActions.addPackAction,
      selectPackId: PacksActions.Creators.selectPackId,
      onEditPack: PacksActions.editPackAction,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles, { withTheme: true })(Packs));
