import { createSelector } from 'reselect';

export const selectAuth = state => state.auth;

export const selectUser = createSelector(
  selectAuth,
  auth => auth.user
);

export const selectRole = createSelector(
  selectUser,
  user => user.role
);

export const selectIsAuthenticated = createSelector(
  selectAuth,
  user => user.isAuthenticated
);
