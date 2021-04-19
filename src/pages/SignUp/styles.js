import styled from 'styled-components';
import colors from '~/styles/colors';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${colors.primaryColor};
`;

export const Form = styled.form`
  width: 300px;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h1`
  font-size: 45px;
  color: white;
  font-weight: bold;

  @media (min-width: 1152px) {
    font-size: 64px;
  }
`;

export const Margin = styled.div`
  margin-top: ${props => (props.marginTop ? props.marginTop : '0px')};
  margin-bottom: ${props => (props.marginBottom ? props.marginBottom : '0px')};
`;

export const ButtonContainer = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: center;
`;

export const Navigator = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding-top: 50px;
  padding-left: 20px;

  @media (min-width: 1152px) {
    padding-left: 0px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
`;

export const BackButton = styled.a`
  margin-right: 20px;
  font-size: 18px;
  color: white;
  font-weight: bold;
`;

export const LinkTo = styled(Link)`
  font-size: 18px;
  color: white;
  font-weight: bold;

  @media (min-width: 1152px) {
    margin-right: 50px;
  }
`;
