import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const ButtonContainer = styled.button`
  width: ${props => props.width};
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.color};
  border-radius: 5px;
  background: ${props => props.background};
  font-size: 14px;
  font-weight: ${props => props.fontWeigth};
  cursor: pointer;
`;

export const LinkContainer = styled(Link)`
  width: ${props => props.width};
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.color};
  border-radius: 5px;
  background: ${props => props.background};
  font-size: 14px;
  font-weight: ${props => props.fontWeigth};
  cursor: pointer;
`;
