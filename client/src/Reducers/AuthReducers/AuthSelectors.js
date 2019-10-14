import { createSelector } from 'reselect';
import { isNil, isEmpty } from 'ramda';

export const selectAuth = state => state.auth;

export const selectUser = createSelector(
  selectAuth,
  auth => auth.user
);

export const selectError = createSelector(
  selectAuth,
  auth => auth.error
);

export const selectFetching = createSelector(
  selectAuth,
  auth => auth.fetching
);

export const selectRole = createSelector(
  selectUser,
  user => user ? user.role : null
);

export const selectIsAuthenticated = createSelector(
  selectUser,
  user => !isNil(user) && !isEmpty(user)
);
