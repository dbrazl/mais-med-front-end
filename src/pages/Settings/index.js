import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import {
  searchLatLongRequest,
  saveLocation,
  setFoundAddressToFalse,
  updateUserRequest,
  resetUser,
} from '~/store/modules/user/actions';

import {
  Container,
  Address,
  Field,
  Input,
  Label,
  Title,
  Modal,
  AuthetificationSection,
  Button,
  GeoWrapper,
  ButtonSection,
  SubmitButton,
} from './styles';

import { ToastContainer, toast } from 'react-toastify';
import GeoButton from '~/components/GeoButton';

function Settings() {
  const userName = useSelector(state => state?.auth?.user?.name);
  const userEmail = useSelector(state => state?.auth?.user?.email);
  const userLocation = useSelector(state => state?.auth?.user?.location);
  const userAddress = useSelector(state => state?.auth?.user?.address);
  const userNeighborhood = useSelector(
    state => state?.auth?.user?.neighborhood
  );

  const [address, setAddress] = useState(userAddress);
  const addressRedux = useSelector(state => state?.user?.register?.address);
  const foundAddress = useSelector(state => state?.user?.status?.foundAddress);
  const locationRedux = useSelector(state => state?.user?.register?.location);
  const neighborhoodRedux = useSelector(
    state => state?.user?.register?.neighborhood
  );

  const nameRedux = useSelector(state => state?.auth?.user?.name);
  const [name, setName] = useState(nameRedux || userName);

  const emailRedux = useSelector(state => state?.user?.register?.email);
  const [email, setEmail] = useState(emailRedux || userEmail);

  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [alteration, setAlteration] = useState(false);

  const reasons = useSelector(state => state?.user?.error?.reasons);

  const dispatch = useDispatch();

  useEffect(() => {
    notify();
    return () => {
      dispatch(resetUser());
    };
  }, []);

  useEffect(() => {
    if (reasons?.length > 0) reasons.forEach(reason => notify(reason));
  }, [reasons]);

  useEffect(() => {
    if (addressRedux?.length > 0) setAddress(addressRedux);
  }, [addressRedux]);

  useEffect(() => {
    const hasChange =
      name !== userName ||
      email !== userEmail ||
      address !== userAddress ||
      password?.length > 0 ||
      newPassword?.length > 0;

    if (hasChange) setAlteration(true);
    else setAlteration(false);
  }, [name, email, address, password, newPassword]);

  function getActualLocation() {
    navigator.geolocation.getCurrentPosition(location => {
      const { latitude, longitude } = location.coords;
      dispatch(saveLocation({ latitude, longitude }));
    });
  }

  function onChangeAddress(event) {
    setAddress(event.target.value);

    if (foundAddress && addressRedux !== address)
      dispatch(setFoundAddressToFalse());
  }

  function onSearchAddress(event) {
    event.preventDefault();
    dispatch(searchLatLongRequest(address));
  }

  function onChangeName(event) {
    setName(event.target.value);
  }

  function onChangeEmail(event) {
    setEmail(event.target.value);
  }

  function onChangePassword(event) {
    setPassword(event.target.value);
  }

  function onChangeNewPassword(event) {
    setNewPassword(event.target.value);
  }

  function onSubmit(event) {
    event.preventDefault();
    dispatch(
      updateUserRequest({
        name,
        email,
        password,
        newPassword,
        location: locationRedux !== userLocation ? locationRedux : userLocation,
        address: userAddress !== addressRedux ? addressRedux : userAddress,
        neighborhood:
          neighborhoodRedux !== userNeighborhood
            ? neighborhoodRedux
            : userNeighborhood,
      })
    );
  }

  function notify(message) {
    toast.error(message);
  }

  return (
    <Container>
      <ToastContainer />
      <Modal>
        <section name="global-settings">
          <Title>Informações globais</Title>
          <Field>
            <Label>Nome</Label>
            <Input
              placeholder="Posto de atendimento"
              value={name}
              onCHange={onChangeName}
            />
          </Field>
          <Address>
            <Field>
              <Label>Endereço</Label>
              <Input
                placeholder="Endereço"
                value={address}
                onChange={onChangeAddress}
              />
            </Field>
            {address?.length <= 0 && (
              <GeoWrapper>
                <GeoButton onClick={getActualLocation} />
              </GeoWrapper>
            )}
            {address?.length > 0 &&
              !foundAddress &&
              address !== userAddress && (
                <Button onClick={onSearchAddress}>Buscar endereço</Button>
              )}
          </Address>
        </section>
        <AuthetificationSection name="authetification-settings">
          <Title>Informações de autentificação</Title>
          <Field>
            <Label type="email">E-mail</Label>
            <Input
              placeholder="E-mail"
              value={email}
              onChange={onChangeEmail}
            />
          </Field>
          <Field>
            <Label>Senha</Label>
            <Input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={onChangePassword}
            />
          </Field>
          <Field>
            <Label>Nova senha</Label>
            <Input
              type="password"
              placeholder="Nova senha"
              value={newPassword}
              onChange={onChangeNewPassword}
            />
          </Field>
        </AuthetificationSection>
      </Modal>
      <ButtonSection>
        {alteration && <SubmitButton onClick={onSubmit}>Salvar</SubmitButton>}
      </ButtonSection>
    </Container>
  );
}

export default Settings;
