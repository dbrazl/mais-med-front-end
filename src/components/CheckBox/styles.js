import styled from 'styled-components';

export const Container = styled.div`
  width: max-content;
  display: flex;
  align-items: center;
`;

export const Box = styled.input`
  width: 18px;
  height: 18px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.25);
  background: white;
  appearance: none;
  cursor: pointer;

  &:checked {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &:checked:after {
    content: '✔';
    font-size: 12px;
    color: black;
  }
`;

export const Label = styled.label`
  margin-left: 10px;
  cursor: pointer;
`;
