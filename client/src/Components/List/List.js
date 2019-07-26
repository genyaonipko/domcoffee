import React from 'react';
import PropTypes from 'prop-types';
import ListWrapper from '@material-ui/core/List';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  wrapper: {
    width: '100%',
    marginLeft: 0,
  },
  top: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    margin: 0,
    marginLeft: 32,
    paddingTop: 8.5,
    paddingBottom: 8.5,
  }
})

const List = ({ children, title, onClick }) => {
  const classes = useStyles();
  return (
    <ListWrapper component="nav">
      <div className={classes.top}>
        {onClick ?
          <Fab
            color="secondary"
            aria-label="Back"
            onClick={onClick}>
            <ArrowBack />
          </Fab> : null
        }
        <Typography className={classes.title} variant="h4" gutterBottom>
            {title}
        </Typography>
      </div>
      {children}
    </ListWrapper>
  )
};

List.propTypes = {
  children: PropTypes.shape({}).isRequired,
  onClick: PropTypes.func,
  title: PropTypes.string.isRequired,
};

List.defaultProps = {
  onClick: null,
}

export default List;
