import React, { useState } from 'react';

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

import NewMedicine from './components/NewMedicine';

import plus from '~/assets/images/plus.svg';
import pills from '~/assets/images/pills.png';
import vacine from '~/assets/images/vacine-icon.png';

function Meds() {
  const [addNewMedicine, setAddNewMedicine] = useState(false);

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

  function onClickToAddNewMedicine(event) {
    event.preventDefault();
    setAddNewMedicine(true);
  }

  return (
    <>
      <Container>
        <Header>
          <AddButton onClick={onClickToAddNewMedicine}>
            <Icon src={plus} />
            <Label>Novo medicamento</Label>
          </AddButton>
        </Header>
        <List>{meds.map(renderMeds)}</List>
      </Container>
      {addNewMedicine && <NewMedicine setAddNewMedicine={setAddNewMedicine} />}
    </>
  );
}

export default Meds;
