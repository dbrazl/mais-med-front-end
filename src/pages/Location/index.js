import React from 'react';
import { promisify } from 'util';

import {
  Container,
  ExitButton,
  Form,
  Title,
  Description,
  Input,
  Continue,
  Icon,
  Label,
} from './styles';
import GeoButton from '~/components/GeoButton';

import arrowRight from '~/assets/images/arrow-right.svg';

function Location() {
  function getActualLocation() {
    navigator.geolocation.getCurrentPosition(location => {
      console.log(location);
    });
  }

  return (
    <Container>
      <ExitButton>Sair</ExitButton>
      <Form>
        <Title>Olá administrador!</Title>
        <Description>
          Adicione o endereço do posto de atendimento, ou permita que coletemos
          ele automaticamente.
        </Description>
        <Input placeholder="Endereço" />
        <GeoButton onClick={getActualLocation} />
        <Continue>
          <Label>Continuar</Label>
          <Icon src={arrowRight} />
        </Continue>
      </Form>
    </Container>
  );
}

export default Location;
