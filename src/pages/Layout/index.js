import React from 'react';
import PropTypes from 'prop-types';
import history from '~/services/history';

import { useDispatch, useSelector } from 'react-redux';
import { setPage } from '~/store/modules/menu/actions';
import { singOut } from '~/store/modules/auth/actions';

import {
  Container,
  Menu,
  Page,
  InputName,
  MenuList,
  MenuItem,
  Icon,
  Label,
  Indicator,
  ExitButton,
} from './styles';

import graph from '~/assets/images/graph.svg';
import meds from '~/assets/images/meds.svg';
import calendar from '~/assets/images/calendar.svg';
import settings from '~/assets/images/settings.svg';

function Layout({ children }) {
  const pageSeted = useSelector(state => state.menu.page);

  const dispatch = useDispatch();

  const page = {
    STATISTICS: 'statistics',
    MEDS: 'meds',
    VACINATIONS: 'vacinations',
    SETTINGS: 'settings',
  };

  function onClickMenuItem(page) {
    dispatch(setPage(page));
  }

  function onSightOut() {
    dispatch(singOut());
    history.push('/');
  }

  return (
    <Container>
      <ExitButton onClick={onSightOut}>Sair</ExitButton>
      <Menu>
        <InputName placeholder="Posto de atendimento" />
        <MenuList>
          <MenuItem
            to={page.STATISTICS}
            onClick={() => onClickMenuItem(page.STATISTICS)}
          >
            <Icon src={graph} />
            <Label>Estatísticas</Label>
            {pageSeted === page.STATISTICS && <Indicator />}
          </MenuItem>
          <MenuItem to={page.MEDS} onClick={() => onClickMenuItem(page.MEDS)}>
            <Icon src={meds} />
            <Label>Medicamentos</Label>
            {pageSeted === page.MEDS && <Indicator />}
          </MenuItem>
          <MenuItem
            to={page.VACINATIONS}
            onClick={() => onClickMenuItem(page.VACINATIONS)}
          >
            <Icon src={calendar} />
            <Label>Vacinações agendadas</Label>
            {pageSeted === page.VACINATIONS && <Indicator />}
          </MenuItem>
          <MenuItem
            to={page.SETTINGS}
            onClick={() => onClickMenuItem(page.SETTINGS)}
          >
            <Icon src={settings} />
            <Label>Dados de usuário</Label>
            {pageSeted === page.SETTINGS && <Indicator />}
          </MenuItem>
        </MenuList>
      </Menu>
      <Page>{children}</Page>
    </Container>
  );
}

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
};

export default Layout;
