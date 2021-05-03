import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
  indexMedsRequest,
  setSelectMed,
  resetData,
} from '~/store/modules/meds/actions';

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
  Wrapper,
  Illustration,
  Message,
} from './styles';

import NewMedicine from './components/NewMedicine';
import EditMedicine from './components/EditMedicine';

import plus from '~/assets/images/plus.svg';
import pills from '~/assets/images/pills.png';
import vacine from '~/assets/images/vacine-icon.png';
import empty from '~/assets/images/medicine-empty.svg';

function Meds() {
  const [addNewMedicine, setAddNewMedicine] = useState(false);
  const [editMed, setEditMed] = useState(false);

  const meds = useSelector(state => state?.meds?.data);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetData());
    dispatch(indexMedsRequest());
  }, []);

  function renderMeds(item, index) {
    const isVacine = item.name.includes('Vacina');
    const quantity = `${item.quantity} un`;

    return (
      <Item onClick={() => onClickOverMed(item)} key={index.toString()}>
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

  function onClickOverMed(item) {
    dispatch(setSelectMed(item));
    setEditMed(true);
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
        {meds?.length > 0 && <List>{meds.map(renderMeds)}</List>}
        {meds?.length <= 0 && (
          <Wrapper>
            <Illustration src={empty} />
            <Message>Não há remédios cadastrados</Message>
          </Wrapper>
        )}
      </Container>
      {addNewMedicine && <NewMedicine setAddNewMedicine={setAddNewMedicine} />}
      {editMed && <EditMedicine setEditMed={setEditMed} />}
    </>
  );
}

export default Meds;
