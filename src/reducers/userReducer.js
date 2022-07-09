import { USER_ACTION_TYPES } from '../actions/types';

const INITIAL_STATE = {
	users: [],
	currentUsers: [],
	currentPage: 1,
	meta: {},
	term: '',
	deletedUsers: [],
};
export const userReducer = (state = INITIAL_STATE, action) => {
	const { type, payload } = action;
	switch (type) {
		case USER_ACTION_TYPES.SET_USERS:
			return {
				...state,
				users: payload,
			};
		case USER_ACTION_TYPES.SET_META_DATA:
			return {
				...state,
				meta: payload,
			};
		case USER_ACTION_TYPES.SET_SEARCH_TERM:
			return {
				...state,
				term: payload,
			};
		case USER_ACTION_TYPES.SET_CURRENT_PAGE:
			return {
				...state,
				currentPage: payload,
			};
		case USER_ACTION_TYPES.SET_META:
			return {
				...state,
				meta: payload,
			};
		case USER_ACTION_TYPES.SET_DELETED_USERS:
			return {
				...state,
				deletedUsers: payload,
			};
		case USER_ACTION_TYPES.SET_CURRENT_USERS:
			return {
				...state,
				currentUsers: payload,
			};

		default:
			return state;
	}
};
