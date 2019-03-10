import { createSelector } from 'reselect';

export const selectSettings = state => state.settings;

export const selectLoader = createSelector(selectSettings, settings => settings.isLoading);
export const selectTabIndex = createSelector(selectSettings, settings => settings.tabIndex);
export const selectDateTransaction = createSelector(selectSettings, settings => settings.dateTransaction);
export const selectSidebar = createSelector(selectSettings, settings => settings.sidebar);
