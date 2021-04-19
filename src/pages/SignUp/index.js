import React, { useState, useEffect } from 'react';

import {
  Container,
  Form,
  Title,
  Margin,
  ButtonContainer,
  Navigator,
  BackButton,
  LinkTo,
} from './styles';
import Input from '~/components/Input';
import Button from '~/components/Button';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDesktopScreen, setIsDesktopScreen] = useState(window.screen.width);

  useEffect(() => {
    window.addEventListener('resize', onResizeWindow);

    return () => window.removeEventListener('resize', onResizeWindow);
  }, []);

  function onResizeWindow(event) {
    setIsDesktopScreen(window.screen.width >= 1152);
  }

  function onChangeEmail(event) {
    setEmail(event?.target?.value || '');
  }

  function onChangePassword(event) {
    setPassword(event?.target?.value || '');
  }

  return (
    <Container>
      <header>
        <Navigator>
          {isDesktopScreen && <BackButton>Página inicial</BackButton>}
          <LinkTo to="/">Login</LinkTo>
        </Navigator>
      </header>
      <Form>
        <Title>Cadastro</Title>
        <Margin marginTop="20px">
          <Input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={onChangeEmail}
          />
        </Margin>
        <Margin marginTop="20px">
          <Input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={onChangePassword}
          />
        </Margin>
        <ButtonContainer>
          <Button>Continuar</Button>
        </ButtonContainer>
      </Form>
    </Container>
  );
}

export default SignUp;
