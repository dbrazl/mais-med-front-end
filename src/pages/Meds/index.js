import React from 'react';

import { useSelector } from 'react-redux';

import {
  Container,
  Header,
  AddButton,
  Icon,
  Label,
  Alert,
  Item,
  LeftSide,
  Labels,
  List,
} from './styles';

import plus from '~/assets/images/plus.svg';
import pills from '~/assets/images/pills.png';
import vacine from '~/assets/images/vacine-icon.png';

function Meds() {
  const meds = useSelector(state => state.meds.data);

  function renderMeds(item, index) {
    const isVacine = item.name.includes('Vacina');
    const quantity = `${item.quantity} un`;

    return (
      <Item>
        <LeftSide>
          <Icon src={isVacine ? vacine : pills} />
          <Labels>
            <Label>{item.name}</Label>
            {item.needSchedule && <Alert>Precisa ser agendada</Alert>}
          </Labels>
        </LeftSide>
        <Label>{quantity}</Label>
      </Item>
    );
  }

  return (
    <Container>
      <Header>
        <AddButton>
          <Icon src={plus} />
          <Label>Novo medicamento</Label>
        </AddButton>
      </Header>
      <List>{meds.map(renderMeds)}</List>
    </Container>
  );
}

export default Meds;
