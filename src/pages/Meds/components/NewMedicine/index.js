import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';
import {
  storeMedsRequest,
  resetRegistered,
} from '~/store/modules/meds/actions';

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

import mask from '~/services/mask';

function NewMedicine({ setAddNewMedicine }) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(undefined);
  const [scheduling, setScheduling] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startHour, setStartHour] = useState('');
  const [endHour, setEndHour] = useState('');
  const [intervalTime, setIntervalTime] = useState('');
  const [error, setError] = useState(false);
  const [incomplete, setIncomplete] = useState(false);
  const success = useSelector(state => state?.meds?.status?.registered);

  const dispatch = useDispatch();

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
    setAddNewMedicine(false);
    if (success) dispatch(resetRegistered());
  }

  function preventPropagation(event) {
    event.stopPropagation();
  }

  function onCheckNeedScheduling() {
    setScheduling(!scheduling);
  }

  function onChangeName(event) {
    setName(event.target.value);
  }

  function onChangeQuantity(event) {
    const value = parseInt(event.target.value);

    if (Number.isInteger(value)) setQuantity(value);

    if (event?.target?.value === '') setQuantity(undefined);
  }

  function onChangeStartDate(event) {
    const value = event?.target?.value;
    const raw = value?.replace(/\D/g, '');

    if (value.length < startDate?.length) setStartDate(value);
    else setStartDate(mask(raw, '99/99/9999'));
  }

  function onChangeEndDate(event) {
    const value = event?.target?.value;
    const raw = value?.replace(/\D/g, '');

    if (value.length < endDate?.length) setEndDate(value);
    else setEndDate(mask(raw, '99/99/9999'));
  }

  function onChangeStartHour(event) {
    const value = event?.target?.value;
    const raw = value?.replace(/\D/g, '');

    if (value.length < startHour?.length) setStartHour(value);
    else setStartHour(mask(raw, '99:99'));
  }

  function onChangeEndHour(event) {
    const value = event?.target?.value;
    const raw = value?.replace(/\D/g, '');

    if (value.length < endHour?.length) setEndHour(value);
    else setEndHour(mask(raw, '99:99'));
  }

  function onChangeIntervalTime(event) {
    const value = event?.target?.value;
    const raw = value?.replace(/\D/g, '');

    if (value.length < intervalTime?.length) setIntervalTime(value);
    else setIntervalTime(mask(raw, '99:99'));
  }

  function isEmpty(string) {
    return string?.length <= 0;
  }

  function isIncompleteDate(string) {
    return string?.length < 10;
  }

  function isIncompleteHour(string) {
    return string?.length < 5;
  }

  function onSubmit(event) {
    event.preventDefault();

    if (scheduling) schedulingSubmit();
    else submit();
  }

  function schedulingSubmit() {
    const payload = {
      name,
      quantity,
      needSchedule: true,
      startDate,
      endDate,
      startHour,
      endHour,
      intervalTime,
    };

    if (
      isEmpty(name) ||
      isEmpty(quantity) ||
      isEmpty(startDate) ||
      isEmpty(endDate) ||
      isEmpty(startHour) ||
      isEmpty(endHour) ||
      isEmpty(intervalTime)
    )
      setError(true);
    else if (
      isIncompleteDate(startDate) ||
      isIncompleteDate(endDate) ||
      isIncompleteHour(startHour) ||
      isIncompleteHour(endHour) ||
      isIncompleteHour(intervalTime)
    )
      setIncomplete(true);
    else dispatch(storeMedsRequest(payload));
  }

  function submit() {
    const payload = {
      name,
      quantity,
      needSchedule: false,
    };

    if (isEmpty(name) || isEmpty(quantity)) setError(true);
    else dispatch(storeMedsRequest(payload));
  }

  return (
    <ModalContainer onClick={onClickOverModalContainer}>
      {!success && (
        <Modal onClick={preventPropagation}>
          <Title>Novo medicamento</Title>
          <Description>
            Informe o nome e a quantidade do medicamento. Se ele precisar de
            agendamento, marque a caixa.
          </Description>
          <Form onSubmit={onSubmit}>
            <Inputs>
              <Input
                width="220px"
                background="#eee"
                placeholder="Nome"
                value={name}
                onChange={onChangeName}
              />
              <Input
                width="110px"
                background="#eee"
                placeholder="Quantidade"
                textAlign="center"
                value={quantity}
                onChange={onChangeQuantity}
              />
            </Inputs>
            <CheckBox
              label="Precisa de agendamento"
              checked={scheduling}
              onChange={onCheckNeedScheduling}
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
                    value={startDate}
                    onChange={onChangeStartDate}
                  />
                </Option>
                <Option>
                  <Label>Fim em</Label>
                  <Input
                    width="110px"
                    background="#eee"
                    placeholder="00/00/0000"
                    textAlign="center"
                    value={endDate}
                    onChange={onChangeEndDate}
                  />
                </Option>
                <Option>
                  <Label>Hora de inicio</Label>
                  <Input
                    width="110px"
                    background="#eee"
                    placeholder="00:00"
                    textAlign="center"
                    value={startHour}
                    onChange={onChangeStartHour}
                  />
                </Option>
                <Option>
                  <Label>Hora de termino</Label>
                  <Input
                    width="110px"
                    background="#eee"
                    placeholder="00:00"
                    textAlign="center"
                    value={endHour}
                    onChange={onChangeEndHour}
                  />
                </Option>
                <Option>
                  <Label>Tempo entre cada atendimento</Label>
                  <Input
                    width="110px"
                    background="#eee"
                    placeholder="00:00"
                    textAlign="center"
                    value={intervalTime}
                    onChange={onChangeIntervalTime}
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
          <Title>Novo medicamento</Title>
          <Description>O medicamento foi cadastrado!</Description>
          <Lottie options={animationOptions} height={150} width={150} />
        </Modal>
      )}
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
