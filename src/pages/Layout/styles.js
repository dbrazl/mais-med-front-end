import styled from 'styled-components';
import colors from '~/styles/colors';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  display: grid;
  grid-template-areas: 'menu page';
  grid-template-columns: 300px 1fr;
  width: 100%;
  height: 100%;
`;

export const Menu = styled.aside`
  grid-area: menu;
  width: 100%;
  height: 100%;
  background: white;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const Page = styled.main`
  grid-area: page;
  width: 100%;
  height: 100%;
  background: ${colors.grey};
`;

export const ExitButton = styled.button`
  position: fixed;
  top: 25px;
  right: 50px;
  font-weight: bold;
  background: transparent;
  cursor: pointer;
`;

export const InputName = styled.input`
  margin-top: 50px;
  font-size: 18px;

  &::placeholder {
    color: black;
  }
`;

export const MenuList = styled.nav`
  margin-top: 60px;
  width: 100%;
`;

export const MenuItem = styled(Link)`
  position: relative;
  width: calc(100% - 20px);
  height: 50px;
  padding-left: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Icon = styled.img`
  width: 21px;
  height: 21px;
  object-fit: contain;
`;

export const Label = styled.p`
  margin-left: 10px;
`;

export const Indicator = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 3px;
  height: 100%;
  border-radius: 5px;
  background: ${colors.secundaryColor};
`;
