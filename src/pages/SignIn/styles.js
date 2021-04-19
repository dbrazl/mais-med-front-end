import styled from 'styled-components';
import colors from '~/styles/colors';

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

export const Buttons = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Restore = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
`;

export const BackButton = styled.a`
  position: fixed;
  top: 0;
  left: 0;
  margin-top: 50px;
  margin-left: 20px;
  font-size: 18px;
  color: white;
  font-weight: bold;

  @media (min-width: 1152px) {
    margin-left: 0px;
    margin-right: 50px;
    right: 0;
    left: unset;
  }
`;
