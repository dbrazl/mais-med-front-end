import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import history from '~/services/history';

import { useDispatch, useSelector } from 'react-redux';
import {
  saveLocation,
  searchLatLongRequest,
  setFoundAddressToFalse,
  setRegisterStep,
} from '~/store/modules/user/actions';

import {
  Container,
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
  const [error, setError] = useState(false);

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

    if (error) setError(false);

    if (foundAddress && addressState !== address)
      dispatch(setFoundAddressToFalse());
  }

  function onSubmit(event) {
    event.preventDefault();
    dispatch(searchLatLongRequest(address));
  }

  function goToNameRoute(event) {
    event.preventDefault();

    if (foundAddress) {
      dispatch(setRegisterStep(3));
      history.push('/name');
    } else setError(true);
  }

  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <Title>Olá administrador!</Title>
        <Description error={error}>
          {error
            ? 'Você esqueceu de informar o endereço! Informe-o para prosseguir.'
            : `Adicione o endereço do posto de atendimento, ou permita que coletemos
          ele automaticamente usando sua posição atual.`}
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
      </Form>
      <Continue onClick={goToNameRoute}>
        <Label>Continuar</Label>
        <Icon src={arrowRight} />
      </Continue>
    </Container>
  );
}

export default Location;
