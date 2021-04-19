import styled from 'styled-components';

export const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Modal = styled.div`
  width: calc(394px - 40px);
  padding: 20px;
  background: white;
  border-radius: 10px;
`;

export const Title = styled.h2`
  margin-bottom: 10px;
  font-size: 24px;
  font-weight: bold;
`;

export const Description = styled.p`
  font-size: 16px;
`;

export const Form = styled.form`
  margin-top: 24px;
`;

export const Inputs = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
`;

export const ButtonContainer = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: center;
`;

export const SchedulingOptions = styled.div`
  margin-top: 30px;
`;

export const Label = styled.p``;

export const Option = styled.div`
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
