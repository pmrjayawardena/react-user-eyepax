import axios from 'axios';
import { Toast } from '../components/UI/toast/toast';
const BASE_API_URL = process.env.REACT_APP_BASE_URL;

export const fetchAllUsers = async (currentPage) => {
	try {
		const allUsers = await axios.get(`${BASE_API_URL}/users?page=${currentPage}`);

		return {
			users: allUsers.data.data,
			meta: {
				total_pages: allUsers.data.total_pages,
				page: allUsers.data.page,
			},
		};
	} catch (error) {
		return {
			error: 'error fetching users',
		};
	}
};
export const fetchAUser = async (id) => {
	try {
		const fetchedUser = await axios.get(`${BASE_API_URL}/users/${id}`);
		return fetchedUser;
	} catch (error) {
		return {
			error: 'error fetching the user',
		};
	}
};

export const addUser = async (body, id) => {
	try {
		const updated = axios.put(`${BASE_API_URL}/users/${id}`, body);
		return updated;
	} catch (error) {
		return {
			error: 'error updating the user',
		};
	}
};
export const updateUser = async (body, id) => {
	try {
		const updated = axios.put(`${BASE_API_URL}/users/${id}`, body);
		return updated;
	} catch (error) {
		return {
			error: 'error updating the user',
		};
	}
};

export const deleteUser = async (id) => {
	try {
		const updated = await axios.delete(`${BASE_API_URL}/users/${id}`);
		return updated;
	} catch (error) {
		console.log('something went wrong');
	}
};
