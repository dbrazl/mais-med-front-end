export function setPage(page) {
  return {
    type: '@MENU/SET_PAGE',
    payload: { page },
  };
}

export function resetPage() {
  return {
    type: '@MENU/RESET_PAGE',
  };
}
