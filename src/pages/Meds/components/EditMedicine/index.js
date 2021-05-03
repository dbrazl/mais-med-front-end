import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useSelector, useDispatch } from 'react-redux';
import {
  resetSelected,
  updateMedRequest,
  resetUpdated,
  deleteMedRequest,
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

function EditMedicine({ setEditMed }) {
  const medicine = useSelector(state => state.meds.selected);

  const [scheduling, setScheduling] = useState(
    medicine?.needToSchedule || false
  );
  const [willDelete, setWillDelete] = useState(false);
  const [quantity, setQuantity] = useState(medicine.quantity);
  const [name, setName] = useState(medicine.name);
  const [startDate, setStartDate] = useState(medicine.scheduleInfo.startDate);
  const [endDate, setEndDate] = useState(medicine.scheduleInfo.endDate);
  const [startHour, setStartHour] = useState(medicine.scheduleInfo.startHour);
  const [endHour, setEndHour] = useState(medicine.scheduleInfo.endHour);
  const [intervalTime, setIntervalTime] = useState(
    medicine.scheduleInfo.intervalTime
  );
  const [error, setError] = useState(false);
  const [incomplete, setIncomplete] = useState(false);
  const success = useSelector(state => state?.meds?.status?.updated);

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetSelected());
    };
  }, []);

  useEffect(() => {
    const startDateRedux = medicine?.scheduleInfo?.startDate;
    const endDateRedux = medicine?.scheduleInfo?.endDate;
    const startHourRedux = medicine?.scheduleInfo?.startHour;
    const endHourRedux = medicine?.scheduleInfo?.endHour;
    const intervalTimeRedux = medicine?.scheduleInfo?.intervalTime;

    if (startDate !== startDateRedux) setStartDate(startDateRedux);
    if (endDate !== endDateRedux) setEndDate(endDateRedux);
    if (startHour !== startHourRedux) setStartHour(startHourRedux);
    if (endHour !== endHourRedux) setEndHour(endHourRedux);
    if (intervalTime !== intervalTimeRedux) setIntervalTime(intervalTimeRedux);
  }, [medicine]);

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
    dispatch(resetUpdated());
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
      willSchedule: scheduling,
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
    else dispatch(updateMedRequest(payload));
  }

  function submit() {
    const payload = {
      name,
      quantity,
      needSchedule: false,
      willSchedule: scheduling,
    };

    if (isEmpty(name) || isEmpty(quantity)) setError(true);
    else dispatch(updateMedRequest(payload));
  }

  function deleteMedicine(event) {
    event.preventDefault();
    setWillDelete(true);
  }

  function surrenderDelete(event) {
    event.preventDefault();
    setWillDelete(false);
  }

  function onDeleteMed(event) {
    event.preventDefault();
    dispatch(deleteMedRequest());
    setEditMed(false);
    dispatch(resetUpdated());
  }

  return (
    <ModalContainer onClick={onClickOverModalContainer}>
      {!success && !willDelete && (
        <Modal onClick={preventPropagation}>
          <Title>{name || 'Medicamento'}</Title>
          <Description>
            Informe o novo nome, quantidade ou se o medicamento precisa de
            agendamento. Caso o medicamento seja excluído e ele tiver
            agendamantos, todos os agendametos feitos serão excluídos.
          </Description>
          <Form onSubmit={onSubmit}>
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
              <Button
                fontWeight="bold"
                background="#eee"
                color="#808080"
                onClick={deleteMedicine}
              >
                Excluir
              </Button>
              <Button fontWeight="bold">Atualizar</Button>
            </ButtonContainer>
          </Form>
        </Modal>
      )}
      {success && !willDelete && (
        <Modal onClick={preventPropagation}>
          <Title>{name}</Title>
          <Description>O medicamento foi editado!</Description>
          <Lottie options={animationOptions} height={150} width={150} />
        </Modal>
      )}
      {willDelete && (
        <Modal onClick={preventPropagation}>
          <Title>Excluir medicamento</Title>
          <Description>{`Tem certeza que deseja excluir ${name}?`}</Description>
          <ButtonContainer>
            <Button fontWeight="bold" onClick={surrenderDelete}>
              Voltar
            </Button>
            <Button
              fontWeight="bold"
              background="#eee"
              color="#808080"
              onClick={onDeleteMed}
            >
              Excluir
            </Button>
          </ButtonContainer>
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
