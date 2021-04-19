import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';

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

import Lottie from 'react-lottie';
import check from '~/assets/animations/check.json';

import Input from '~/components/Input';
import CheckBox from '~/components/CheckBox';
import Button from '~/components/Button';

function EditMedicine({ setEditMed }) {
  const medicine = useSelector(state => state.meds.selected);

  const [scheduling, setScheduling] = useState(false);
  const [quantity, setQuantity] = useState(medicine.quantity);
  const [name, setName] = useState(medicine.name);

  const success = false;

  const animationOptions = {
    loop: false,
    autoplay: true,
    animationData: check,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  function onClickOverModalContainer(event) {
    event.preventDefault();
    setEditMed(false);
  }

  function preventPropagation(event) {
    event.stopPropagation();
  }

  function onCheckNeddScheduling() {
    setScheduling(!scheduling);
  }

  function onChangeName(event) {
    setName(event.target.value);
  }

  function onChangeQuantity(event) {
    setQuantity(event.target.value);
  }

  return (
    <ModalContainer onClick={onClickOverModalContainer}>
      {!success && (
        <Modal onClick={preventPropagation}>
          <Title>{name || 'Medicamento'}</Title>
          <Description>
            Informe o novo nome, quantidade ou se o medicamento precisa de
            agendamento. Caso o medicamento seja excluído e ele tiver
            agendamantos, todos os agendametos feitos serão excluídos.
          </Description>
          <Form>
            <Inputs>
              <Input
                width="220px"
                background="#eee"
                placeholder="Nome"
                onChange={onChangeName}
                value={name}
              />
              <Input
                width="110px"
                background="#eee"
                placeholder="Quantidade"
                textAlign="center"
                onChange={onChangeQuantity}
                value={quantity}
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
      )}
      {success && (
        <Modal onClick={preventPropagation}>
          <Title>{name}</Title>
          <Description>O medicamento foi editado!</Description>
          <Lottie options={animationOptions} height={150} width={150} />
        </Modal>
      )}
    </ModalContainer>
  );
}

EditMedicine.propTypes = {
  setEditMed: PropTypes.func,
};

EditMedicine.defaultProps = {
  setEditMed: () => {},
};

export default EditMedicine;
