import { createSelector } from 'reselect';

export const selectSettings = state => state.common;
export const selectErrors = state => state.error;
export const selectUsers = state => state.users;

export const selectLoader = createSelector(
  selectSettings,
  settings => settings.isLoading,
);

export const selectDateTransaction = createSelector(
  selectSettings,
  settings => settings.dateTransaction,
);

export const selectSidebar = createSelector(
  selectSettings,
  settings => settings.sidebar,
);

export const selectDateFilter = createSelector(
  selectSettings,
  settings => settings.dateFilter,
);
