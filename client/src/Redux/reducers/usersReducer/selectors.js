import { createSelector } from 'reselect';
import moment from 'moment';

export const selectUsers = state => state.users;

export const selectUsersForDashboard = createSelector(
  selectUsers,
  users => {
    if (!users) return [];
    const data = users.map((item, index) => [
      index + 1,
      item.name,
      moment(item.date).format('DD.MM.YYYY'),
      moment(item.date).format('DD.MM.YYYY'),
    ]);
    return data;
  },
);
