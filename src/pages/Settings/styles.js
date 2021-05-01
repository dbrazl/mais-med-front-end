import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 130px;
  padding: 0 20px;
  width: calc(100% - 40px);
  height: calc(100% - 130px);
  overflow-y: scroll;
`;

export const Modal = styled.div`
  width: calc(100% - 60px);
  padding: 30px;
  background: white;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h2`
  font-weight: bold;
  font-size: 18px;
`;

export const Field = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  align-items: center;
`;

export const Label = styled.p`
  width: 105px;
`;

export const Input = styled.input`
  color: #808080;
  width: 100%;
`;

export const Address = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const AuthetificationSection = styled.section`
  margin-top: 40px;
`;

export const GeoWrapper = styled.div`
  margin-top: 20px;
`;

export const Button = styled.button`
  margin-top: 20px;
  min-width: max-content;
  background: transparent;
  cursor: pointer;
`;

export const ButtonSection = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

export const SubmitButton = styled.button`
  width: 150px;
  height: 45px;
  border-radius: 5px;
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  cursor: pointer;
`;
