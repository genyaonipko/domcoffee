import { createSelector } from 'reselect';

export const selectSettings = state => state.settings;

export const selectLoader = createSelector(selectSettings, settings => settings.isLoading);
export const selectTabIndex = createSelector(selectSettings, settings => settings.tabIndex);
