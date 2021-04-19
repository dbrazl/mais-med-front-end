import React from 'react';

import {
  Container,
  Address,
  Field,
  Input,
  Label,
  Title,
  Modal,
  AuthetificationSection,
} from './styles';

import GeoButton from '~/components/GeoButton';

function Settings() {
  return (
    <Container>
      <Modal>
        <section name="global-settings">
          <Title>Informações globais</Title>
          <Field>
            <Label>Nome</Label>
            <Input placeholder="Posto de atendimento" />
          </Field>
          <Address>
            <Field>
              <Label>Endereço</Label>
              <Input placeholder="Endereço" />
            </Field>
            <GeoButton />
          </Address>
        </section>
        <AuthetificationSection name="authetification-settings">
          <Title>Informações de autentificação</Title>
          <Field>
            <Label type="email">E-mail</Label>
            <Input placeholder="E-mail" />
          </Field>
          <Field>
            <Label>Senha</Label>
            <Input type="password" placeholder="Senha" />
          </Field>
          <Field>
            <Label>Nova senha</Label>
            <Input type="password" placeholder="Nova senha" />
          </Field>
        </AuthetificationSection>
      </Modal>
    </Container>
  );
}

export default Settings;
