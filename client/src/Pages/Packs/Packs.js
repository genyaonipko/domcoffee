import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';

import AppBarComponent from '../../Components/AppBarComponent';
import FormDialog from '../../Components/SubmitModal';
import PacksActions from '../../Redux/actions/packs';
import SnackBar from '../../Components/SnackBar';

import * as PacksSelectors from '../../Redux/reducers/packsReducers/selectors';
import { additionalSelectors } from '../../Redux/reducers/additionalReducer';

import PacksTabContainer from './Components/PacksTabContainer';
import DegustationTabContainer from './Components/DegustationTabContainer';
import TabPages from '../../Components/TabPage';
import SpeedDial from '../../Components/SpeedDial';
import EditModal from '../../Components/EditModal';

const TAB_TITLES = ['Пачки', 'Дегустационные чашки'];
const APP_BAR_TITLE = 'Пачки';
const FORM_DIALOG_TITLE = 'пачек';
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
});

const Packs = ({
  onSubmitPacks,
  onSubmitDegustations,
  getPacks,
  getDegustation,
  tabIndex,
  classes,
  errorsPacks,
  errorsDegustation,
  ...props
}) => {
  const [open, setOpen] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  useEffect(() => {
    getPacks();
    getDegustation();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenEditModal = () => {
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  const handleSubmit = values => {
    if (!tabIndex) {
      onSubmitPacks(values);
    } else {
      onSubmitDegustations(values);
    }
  };

  const renderFormDialog = () => {
    return (
      <>
        <FormDialog
          onSubmit={handleSubmit}
          open={open}
          handleClose={handleClose}
          title={FORM_DIALOG_TITLE}
        />
        <EditModal
          open={openEditModal}
          handleClose={handleCloseEditModal}
          dataTitle="packs"
        />
      </>
    );
  };

  const renderFabButton = () => {
    return (
      <SpeedDial
        addAction={handleClickOpen}
        editAction={handleOpenEditModal}
      />
    );
  };

  const renderContent = () => {
    return (
      <TabPages classes={classes} tabTitles={TAB_TITLES} {...props}>
        <PacksTabContainer />
        <DegustationTabContainer />
      </TabPages>
    );
  };

  const renderSnackBar = () => {
    return (
      <SnackBar
        visible={!!errorsPacks || !!errorsDegustation}
        type="error"
        message={errorsPacks || errorsDegustation}
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
  errorsDegustation: PropTypes.string.isRequired,

  // function
  getPacks: PropTypes.func.isRequired,
  getDegustation: PropTypes.func.isRequired,
  onSubmitPacks: PropTypes.func.isRequired,
  onSubmitDegustations: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  tabIndex: additionalSelectors.selectTabIndex,
  errorsPacks: PacksSelectors.selectPacksError,
  errorsDegustation: PacksSelectors.selectDegustationError,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getPacks: PacksActions.getPackAction,
      getDegustation: PacksActions.getDegustationAction,
      onSubmitPacks: PacksActions.addPackAction,
      onSubmitDegustations: PacksActions.addDegustationAction,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles, { withTheme: true })(Packs));
