import React from 'react';

import { useSelector } from 'react-redux';

import mask from '~/services/mask';

import { Container, Icon, Label, Item, Side, Labels, List } from './styles';

import pills from '~/assets/images/pills.png';
import vacine from '~/assets/images/vacine-icon.png';

function Meds() {
  const vacinations = useSelector(state => state.vacination.data);

  function renderMeds(item, index) {
    const cpf = mask(item.cpf, 'CPF 999.999.999-99');

    return (
      <Item key={index.toString()}>
        <Side>
          <Icon src={vacine} />
          <Labels>
            <Label marginLeft="10px">{item.name}</Label>
            <Label color="#808080" fontSize="12px" marginLeft="10px">
              {cpf}
            </Label>
          </Labels>
        </Side>
        <Side>
          <Label>{item.date}</Label>
          <Label marginLeft="10px">{item.schedule}</Label>
        </Side>
      </Item>
    );
  }

  return (
    <Container>
      <List>{vacinations.map(renderMeds)}</List>
    </Container>
  );
}

export default Meds;
