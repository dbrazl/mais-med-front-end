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
  display: flex;
  align-items: center;
`;

export const Label = styled.p`
  width: 105px;
`;

export const Input = styled.input`
  color: #808080;
  width: 200px;
`;

export const Address = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const AuthetificationSection = styled.section`
  margin-top: 40px;
`;
