import React from 'react';
import ErrorIcon from '@material-ui/icons/Error';

const styles = {
  container : {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100vw',
    height: '100vh',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    color: '#ffffff',
  },
  title: {
    width: '80vw',
    color: '#ffffff',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  icon: {
    width: '20vw',
    height: '20vh',
  }
}

const Fixture = () => <div style={styles.container}>
    <span style={styles.title}>only Tablet and Desktop</span>
    <ErrorIcon style={styles.icon} color="inherit" />
  </div>

export default Fixture;
