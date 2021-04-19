import React from 'react';
import PropTypes from 'prop-types';

import { Field } from './styles';

function Input({
  color,
  width,
  placeholder,
  placeholderColor,
  value,
  onChange,
  background,
  type,
}) {
  return (
    <Field
      color={color}
      width={width}
      placeholder={placeholder}
      placeholderColor={placeholderColor}
      value={value}
      onChange={onChange}
      background={background}
      type={type}
    />
  );
}

Input.propTypes = {
  color: PropTypes.string,
  width: PropTypes.string,
  placeholderColor: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  background: PropTypes.string,
  type: PropTypes.string,
};

Input.defaultProps = {
  color: 'black',
  width: '300px',
  placeholderColor: 'black',
  placeholder: 'Campo',
  value: '',
  onChange: () => {},
  background: 'white',
  type: 'text',
};

export default Input;
