import React, { useState, useEffect } from 'react';
import history from '~/services/history';

import { useDispatch, useSelector } from 'react-redux';
import {
  userExistRequest,
  saveEmailPassword,
  setRegisterStep,
} from '~/store/modules/user/actions';

import {
  Container,
  Form,
  Title,
  Margin,
  ButtonContainer,
  Navigator,
  BackButton,
  LinkTo,
  Error,
} from './styles';
import Input from '~/components/Input';
import Button from '~/components/Button';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDesktopScreen, setIsDesktopScreen] = useState(window.screen.width);
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const userExist = useSelector(state => state.user.status.userExist);

  const dispatch = useDispatch();

  useEffect(() => {
    window.addEventListener('resize', onResizeWindow);

    return () => window.removeEventListener('resize', onResizeWindow);
  }, []);

  useEffect(() => {
    if (userExist) setErrorEmail('O e-mail já foi cadastrado');
    else setErrorEmail('');

    if (!userExist && !isEmpty(email) && !isEmpty(password)) {
      dispatch(saveEmailPassword({ email, password }));
      dispatch(setRegisterStep(2));
      history.push('/location');
    }
  }, [userExist]);

  function isEmpty(string) {
    return string?.length <= 0;
  }

  function onResizeWindow(event) {
    setIsDesktopScreen(window.screen.width >= 1152);
  }

  function onChangeEmail(event) {
    setEmail(event?.target?.value || '');
  }

  function onChangePassword(event) {
    setPassword(event?.target?.value || '');
  }

  function hasValidationErrors() {
    const emailParser = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]/i;
    const PASSWORD_LENGTH = 6;

    const emailValidation = !emailParser.test(email);
    const passwordValidation = password.length < PASSWORD_LENGTH;

    if (emailValidation) setErrorEmail('E-mail inválido');
    else setErrorEmail('');

    if (passwordValidation)
      setErrorPassword('A senha deve ter pelo menos 6 caracteres');
    else setErrorPassword('');

    return emailValidation || passwordValidation;
  }

  function onSubmit(event) {
    event.preventDefault();

    if (!hasValidationErrors()) dispatch(userExistRequest(email));
  }

  return (
    <Container>
      <header>
        <Navigator>
          {isDesktopScreen && <BackButton>Página inicial</BackButton>}
          <LinkTo to="/">Login</LinkTo>
        </Navigator>
      </header>
      <Form onSubmit={onSubmit}>
        <Title>Cadastro</Title>
        <Margin marginTop="20px">
          <Input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={onChangeEmail}
          />
        </Margin>
        {errorEmail.length > 0 && (
          <Margin marginTop="10px">
            <Error>{errorEmail}</Error>
          </Margin>
        )}
        <Margin marginTop="20px">
          <Input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={onChangePassword}
          />
        </Margin>
        {errorPassword.length > 0 && (
          <Margin marginTop="10px">
            <Error>{errorPassword}</Error>
          </Margin>
        )}
        <ButtonContainer>
          <Button>Continuar</Button>
        </ButtonContainer>
      </Form>
    </Container>
  );
}

export default SignUp;
