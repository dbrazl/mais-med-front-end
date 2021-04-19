import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  ButtonContainer,
  Description,
  Form,
  Inputs,
  Modal,
  ModalContainer,
  Title,
  SchedulingOptions,
  Label,
  Option,
} from './styles';

import Input from '~/components/Input';
import CheckBox from '~/components/CheckBox';
import Button from '~/components/Button';

function NewMedicine({ setAddNewMedicine }) {
  const [scheduling, setScheduling] = useState(false);

  function onClickOverModalContainer(event) {
    event.preventDefault();
    setAddNewMedicine(false);
  }

  function preventPropagation(event) {
    event.stopPropagation();
  }

  function onCheckNeddScheduling() {
    setScheduling(!scheduling);
  }

  return (
    <ModalContainer onClick={onClickOverModalContainer}>
      <Modal onClick={preventPropagation}>
        <Title>Novo medicamento</Title>
        <Description>
          Informe o nome e a quantidade do medicamento. Se ele precisar de
          agendamento, marque a caixa.
        </Description>
        <Form>
          <Inputs>
            <Input width="220px" background="#eee" placeholder="Nome" />
            <Input
              width="110px"
              background="#eee"
              placeholder="Quantidade"
              textAlign="center"
            />
          </Inputs>
          <CheckBox
            label="Precisa de agendamento"
            checked={scheduling}
            onChange={onCheckNeddScheduling}
          />
          {scheduling && (
            <SchedulingOptions>
              <Label>Informe o perído para o agendamento</Label>
              <Option>
                <Label>Inicio em</Label>
                <Input
                  width="110px"
                  background="#eee"
                  placeholder="00/00/0000"
                  textAlign="center"
                />
              </Option>
              <Option>
                <Label>Fim em</Label>
                <Input
                  width="110px"
                  background="#eee"
                  placeholder="00/00/0000"
                  textAlign="center"
                />
              </Option>
              <Option>
                <Label>Hora de inicio</Label>
                <Input
                  width="110px"
                  background="#eee"
                  placeholder="00:00"
                  textAlign="center"
                />
              </Option>
              <Option>
                <Label>Hora de termino</Label>
                <Input
                  width="110px"
                  background="#eee"
                  placeholder="00:00"
                  textAlign="center"
                />
              </Option>
              <Option>
                <Label>Tempo entre cada atendimento</Label>
                <Input
                  width="110px"
                  background="#eee"
                  placeholder="00:00"
                  textAlign="center"
                />
              </Option>
            </SchedulingOptions>
          )}
          <ButtonContainer>
            <Button fontWeight="bold">Cadastrar</Button>
          </ButtonContainer>
        </Form>
      </Modal>
    </ModalContainer>
  );
}

NewMedicine.propTypes = {
  setAddNewMedicine: PropTypes.func,
};

NewMedicine.defaultProps = {
  setAddNewMedicine: () => {},
};

export default NewMedicine;
