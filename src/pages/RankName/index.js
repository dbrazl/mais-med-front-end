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

import arrowRight from '~/assets/images/arrow-right.svg';

function RankName() {
  return (
    <Container>
      <ExitButton>Sair</ExitButton>
      <Form>
        <Title>Beleza!</Title>
        <Description>
          Qual nome deseja colocar para o posto de atendimento?
        </Description>
        <Input placeholder="Nome" />
        <Continue>
          <Label>Continuar</Label>
          <Icon src={arrowRight} />
        </Continue>
      </Form>
    </Container>
  );
}

export default RankName;
