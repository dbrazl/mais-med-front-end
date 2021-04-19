import React from 'react';
import PropTypes from 'prop-types';

import globe from '~/assets/images/globe.svg';
import { Container, Icon, Label } from './styles';

function GeoButton({ onClick }) {
  return (
    <Container onClick={onClick}>
      <Icon src={globe} />
      <Label>Coletar endereço automaticamente</Label>
    </Container>
  );
}

GeoButton.propTypes = {
  onClick: PropTypes.func,
};

GeoButton.defaultProps = {
  onClick: () => {},
};

export default GeoButton;
