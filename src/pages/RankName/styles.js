import styled from 'styled-components';
import colors from '~/styles/colors';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Form = styled.form`
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 1152px) {
    width: 445px;
  }
`;

export const Title = styled.h1`
  width: 100%;
  margin-bottom: 20px;
  font-size: 18px;

  @media (min-width: 1152px) {
    font-size: 24px;
  }
`;

export const Description = styled.p`
  width: 100%;
  font-size: 16px;
  color: ${props => (props.error ? colors.red : 'black')};
  font-weight: ${props => (props.error ? 'bold' : 'normal')};

  @media (min-width: 1152px) {
    font-size: 18px;
  }
`;

export const Input = styled.input`
  margin-top: 71px;
  margin-bottom: 50px;
  width: 300px;
  height: 45px;
  color: black;
  border-bottom: 1px solid black;
  text-align: center;

  &::placeholder {
    color: black;
  }
`;

export const Continue = styled.button`
  position: fixed;
  bottom: 25px;
  right: 50px;
  display: flex;
  align-items: center;
  flex-direction: row;
  background: transparent;
  cursor: pointer;
`;

export const Icon = styled.img`
  width: 24px;
  height: 24px;
  object-fit: contain;
`;

export const Label = styled.p`
  margin-right: 10px;
`;
