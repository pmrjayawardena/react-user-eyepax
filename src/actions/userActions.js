import { USER_ACTION_TYPES } from './types';

export const setUsersData = (user) => {
	return { type: USER_ACTION_TYPES.SET_USERS, payload: user };
};

export const setCurrentPage = (currentPage) => {
	return { type: USER_ACTION_TYPES.SET_CURRENT_PAGE, payload: currentPage };
};

export const setMeta = (metaData) => {
	return { type: USER_ACTION_TYPES.SET_META, payload: metaData };
};

export const setTerm = (searchTerm) => {
	return { type: USER_ACTION_TYPES.SET_SEARCH_TERM, payload: searchTerm };
};
export const setDeletedUsers = (deletedId) => {
	return { type: USER_ACTION_TYPES.SET_DELETED_USERS, payload: deletedId };
};
