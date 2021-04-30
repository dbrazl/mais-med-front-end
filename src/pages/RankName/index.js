import React, { useState, useEffect } from 'react';
import history from '~/services/history';
import _ from 'lodash';

import { useSelector, useDispatch } from 'react-redux';
import { setName, storeUserRequest } from '~/store/modules/user/actions';

import {
  Container,
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
  const [error, setError] = useState(false);
  const name = useSelector(state => state.user.register.name);
  const registerStep = useSelector(state => state.user.status.registerStep);

  const dispatch = useDispatch();

  useEffect(() => {
    if (registerStep !== 3) history.push('/location');
  }, []);

  function onChangeName(event) {
    const value = event.target.value;
    dispatch(setName(value));

    if (error) setError(false);
  }

  function goToDashboard(event) {
    event.preventDefault();

    if (name.length > 0) dispatch(storeUserRequest());
    else setError(true);
  }

  return (
    <Container>
      <Form>
        <Title>{error ? 'Nada beleza!' : 'Beleza!'}</Title>
        <Description error={error}>
          {error
            ? 'Para prosseguir você deve informar o nome do estabelecimento!'
            : 'Qual nome deseja colocar para o posto de atendimento?'}
        </Description>
        <Input placeholder="Nome" value={name} onChange={onChangeName} />
      </Form>
      <Continue onClick={goToDashboard}>
        <Label>Continuar</Label>
        <Icon src={arrowRight} />
      </Continue>
    </Container>
  );
}

export default RankName;
