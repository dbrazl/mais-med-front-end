import React from 'react';
import PropTypes from 'prop-types';
import generateId from '~/services/generateId';

import { Container, Box, Label } from './styles';

function CheckBox({ checked, label, onChange }) {
  const id = generateId();

  return (
    <Container>
      <Box type="checkbox" id={id} checked={checked} onChange={onChange} />
      <Label htmlFor={id}>{label}</Label>
    </Container>
  );
}

CheckBox.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  label: PropTypes.string,
};

CheckBox.defaultProps = {
  checked: false,
  onChange: () => {},
  label: 'Algum texto',
};

export default CheckBox;
