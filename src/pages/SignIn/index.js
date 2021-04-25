import React, { useState, useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { signInRequest } from '~/store/modules/auth/actions';

import {
  Container,
  Form,
  Title,
  Margin,
  Buttons,
  Restore,
  BackButton,
} from './styles';
import Input from '~/components/Input';
import Button from '~/components/Button';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDesktopScreen, setIsDesktopScreen] = useState(window.screen.width);

  const dispatch = useDispatch();

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

  function onSubmit(event) {
    event.preventDefault();
    dispatch(signInRequest({ email, password }));
  }

  return (
    <Container>
      <BackButton href="#">
        {isDesktopScreen ? 'Página inicial' : 'voltar'}
      </BackButton>
      <Form onSubmit={onSubmit}>
        <Title>Login</Title>
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
        <Buttons>
          <Button link to="/register" background="transparent" color="black">
            Criar conta
          </Button>
          <Button>Entrar</Button>
        </Buttons>
        <Restore>
          <Button link to="" background="transparent" color="black">
            Recuperar conta
          </Button>
        </Restore>
      </Form>
    </Container>
  );
}

export default SignIn;
