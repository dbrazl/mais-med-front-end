import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import history from '~/services/history';

import { useDispatch, useSelector } from 'react-redux';
import {
  saveLocation,
  searchLatLongRequest,
  setFoundAddressToFalse,
} from '~/store/modules/user/actions';

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
  Button,
} from './styles';
import GeoButton from '~/components/GeoButton';

import arrowRight from '~/assets/images/arrow-right.svg';

function Location() {
  const [address, setAddress] = useState('');
  const addressState = useSelector(state => state.user.register.address);
  const foundAddress = useSelector(state => state.user.status.foundAddress);
  const registerStep = useSelector(state => state.user.status.registerStep);

  useEffect(() => {
    setAddress(addressState);

    if (registerStep !== 2) history.push('/register');
  }, [addressState]);

  const dispatch = useDispatch();

  function getActualLocation() {
    navigator.geolocation.getCurrentPosition(location => {
      const { latitude, longitude } = location.coords;
      dispatch(saveLocation({ latitude, longitude }));
    });
  }

  function onChangeAddress(event) {
    setAddress(event.target.value);

    if (foundAddress && addressState !== address)
      dispatch(setFoundAddressToFalse());
  }

  function onSubmit(event) {
    event.preventDefault();
    dispatch(searchLatLongRequest(address));
  }

  return (
    <Container>
      <ExitButton>Sair</ExitButton>
      <Form onSubmit={onSubmit}>
        <Title>Olá administrador!</Title>
        <Description>
          Adicione o endereço do posto de atendimento, ou permita que coletemos
          ele automaticamente.
        </Description>
        <Input
          placeholder="Endereço"
          value={address || ''}
          onChange={onChangeAddress}
        />
        {address?.length <= 0 && <GeoButton onClick={getActualLocation} />}
        {address?.length > 0 && !foundAddress && (
          <Button>Buscar endereço</Button>
        )}
        <Continue>
          <Label>Continuar</Label>
          <Icon src={arrowRight} />
        </Continue>
      </Form>
    </Container>
  );
}

export default Location;
