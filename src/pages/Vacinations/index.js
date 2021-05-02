import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { indexVacinationRequest } from '~/store/modules/vacination/actions';

import mask from '~/services/mask';

import {
  Container,
  Icon,
  Label,
  Item,
  Side,
  Labels,
  List,
  Wrapper,
  ListEmpty,
  Message,
} from './styles';

import pills from '~/assets/images/pills.png';
import vacine from '~/assets/images/vacine-icon.png';
import empty from '~/assets/images/vacine-empty.svg';

function Meds() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(indexVacinationRequest());
  }, []);

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
      {vacinations?.length > 0 && <List>{vacinations.map(renderMeds)}</List>}
      {vacinations?.length <= 0 && (
        <Wrapper>
          <ListEmpty src={empty} />
          <Message>Não há vacinações cadastradas</Message>
        </Wrapper>
      )}
    </Container>
  );
}

export default Meds;
