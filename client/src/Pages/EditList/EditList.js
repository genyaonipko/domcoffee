import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { Route, Switch } from 'react-router-dom';
// import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect'
import Collapse from '@material-ui/core/Collapse';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import EditIcon from '@material-ui/icons/Edit';
import CoffeeIcon from '@material-ui/icons/LocalCafe';
import MaterialList from '@material-ui/core/List';
// import { makeStyles } from '@material-ui/styles';
import List from '../../Components/List';
import ListItem from '../../Components/ListItem';
import EditModal from '../../Components/EditModal';

const EditList = ({ history }) => {
  const [open, setOpen] = React.useState('');
  const [modal, setModal] = React.useState('');
  const handleOpen = event => () => {
    if (open && open === event) return setOpen('');
    return setOpen(event);
  }
  const handleOpenModal = event => () => {
    return setModal(event);
  }
  return (
    <>
      <List onClick={() => history.push('/settings')} title="Список транзакций">
        <ListItem icon={ShoppingCartIcon}  title="Пачки" onClick={handleOpen('packs')} />
        <Collapse in={open === 'packs'} timeout="auto" unmountOnExit>
          <MaterialList component="div" disablePadding>
            <ListItem icon={EditIcon} styles={{ paddingLeft: 32 }} title="Пачки" onClick={handleOpenModal('packs')} />
            <ListItem icon={EditIcon} styles={{ paddingLeft: 32 }} title="Дегустационные чашки" onClick={handleOpenModal('degustation')} />
          </MaterialList>
        </Collapse>
        <ListItem icon={CoffeeIcon} title="Продажи" onClick={handleOpen('sales')} />
        <Collapse in={open === 'sales'} timeout="auto" unmountOnExit>
          <MaterialList component="div" disablePadding>
            <ListItem icon={EditIcon} styles={{ paddingLeft: 32 }} title="Помол" onClick={handleOpenModal('coffee')} />
            <ListItem icon={EditIcon} styles={{ paddingLeft: 32 }} title="Порции" onClick={handleOpenModal('portions')} />
          </MaterialList>
        </Collapse>
      </List>
      {modal ? <EditModal open={!!modal} dataTitle={modal} /> : null}
    </>
  )
}

EditList.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
}

const mSTP = createStructuredSelector({
});

export default connect(mSTP)(EditList);