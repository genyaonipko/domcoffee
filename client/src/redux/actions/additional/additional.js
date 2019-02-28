/* eslint-disable */
import { createActions } from 'reduxsauce'

export const { Creators } = createActions({
  setSidebarState: ['payload'],
  setIndexTab: ['payload'],
  setLoader: ['payload'],
  getErrors: ['payload'],
  setCurrentUser: ['payload'],
}, {})
