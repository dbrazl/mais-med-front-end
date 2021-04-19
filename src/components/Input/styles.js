import styled from 'styled-components';

export const Field = styled.input`
  padding-left: 10px;
  width: ${props => `calc(${props.width} - 10px)`};
  height: 40px;
  border-radius: 5px;
  background: ${props => props.background};
  color: ${props => props.color};
  text-align: ${props => props.textAlign};

  &::placeholder {
    color: ${props => props.placeholderColor};
  }
`;
