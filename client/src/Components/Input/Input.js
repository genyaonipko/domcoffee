import React from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';

const InputTextField = ({
  input,
  label,
  type,
  name,
  autoFocus,
  autoComplete,
  styles,
}) => {
  return (
    <TextField
      style={styles}
      autoFocus={autoFocus}
      autoComplete={autoComplete}
      id={name}
      type={type}
      name={name}
      label={label}
      margin="dense"
      variant="outlined"
      {...input}
    />
  );
};

InputTextField.propTypes = {
  input: PropTypes.shape({}).isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string,
  autoFocus: PropTypes.bool,
  autoComplete: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  styles: PropTypes.shape({}),

};

InputTextField.defaultProps = {
  name: null,
  autoFocus: null,
  styles: {},
};

export default React.memo(InputTextField);
