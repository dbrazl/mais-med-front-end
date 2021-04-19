import React from 'react';
import PropTypes from 'prop-types';
import colors from '~/styles/colors';

import { ButtonContainer, LinkContainer } from './styles';

function Button({
  link,
  to,
  width,
  color,
  background,
  fontWeight,
  children,
  onClick,
}) {
  if (link)
    return (
      <LinkContainer
        to={to}
        width={width}
        color={color}
        background={background}
        fontWeight={fontWeight}
        onClick={onClick}
      >
        {children}
      </LinkContainer>
    );

  return (
    <ButtonContainer
      width={width}
      color={color}
      background={background}
      fontWeight={fontWeight}
      onClick={onClick}
    >
      {children}
    </ButtonContainer>
  );
}

Button.propTypes = {
  link: PropTypes.bool,
  to: PropTypes.string,
  width: PropTypes.string,
  color: PropTypes.string,
  background: PropTypes.string,
  fontWeight: PropTypes.string,
  children: PropTypes.string,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  link: false,
  to: '',
  width: '150px',
  color: 'white',
  background: colors.secundaryColor,
  fontWeight: 'normal',
  children: 'Botão',
  onClick: () => {},
};

export default Button;
