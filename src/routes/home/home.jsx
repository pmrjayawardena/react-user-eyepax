import React, { useState, useEffect } from 'react';
import Users from '../../components/users/users';
import { Pagination } from '../../components/pagination/pagination';
import { useDispatch, useSelector } from 'react-redux';
import {
	setUsersData,
	setCurrentPage,
	setMeta,
	setTerm,
} from '../../actions/userActions';
import Loader from '../../components/UI/loader/loader';
import { Toast } from '../../components/UI/toast/toast';
import { sort } from '../../utils/sort';
import { fetchAllUsers, deleteUser } from '../../requests/userRequest';
import { SpinnerContainer } from '../../components/UI/loader/loaderStyle';
import { HomeContainer } from './homeStyle';
import { useSearchParams, useNavigate, createSearchParams } from 'react-router-dom';
import { setDeletedUsers } from '../../actions/userActions';

const useNavigateSearch = () => {
	const navigate = useNavigate();
	return (pathname, params) => navigate(`${pathname}?${createSearchParams(params)}`);
};

export const Home = () => {
	const navigateSearch = useNavigateSearch();
	const [searchParams] = useSearchParams();

	let term = searchParams.get('term');
	let sortType = searchParams.get('sort');
	let fieldName = searchParams.get('field');

	const dispatch = useDispatch();
	const usersData = useSelector((state) => state.user.users);
	const currentPage = useSelector((state) => state.user.currentPage);
	const searchTerm = useSelector((state) => state.user.term);
	const meta = useSelector((state) => state.user.meta);
	const deletedUsers = useSelector((state) => state.user.deletedUsers);
	const [loading, setLoading] = useState(false);

	const getUsers = async () => {
		try {
			setLoading(true);
			let data = await fetchAllUsers(currentPage);
			const usersDataArray = data.users;
			let storefinal = usersDataArray.filter((item) => {
				console.log(deletedUsers);
				if (deletedUsers.length === 0) {
					return item;
				} else {
					if (!deletedUsers.includes(item.id)) {
						return item;
					}
				}
			});

			dispatch(setUsersData(storefinal));
			dispatch(setMeta(data.meta));
			setLoading(false);
		} catch (error) {
			setLoading(false);
			Toast('something went wrong');
		}
	};
	useEffect(() => {
		getUsers();
	}, [currentPage]);

	const deleteUserById = async (user) => {
		const filteredUsers = usersData.filter((item) => item.id != user.id);
		const deleted = usersData.filter((item) => item.id == user.id);

		const includes = deletedUsers.includes(deleted[0].id);
		if (!includes) {
			const allDeleted = [...deletedUsers, deleted[0].id];
			dispatch(setDeletedUsers(allDeleted));
		}

		dispatch(setUsersData(filteredUsers));
		Toast(`user ${user.first_name} ${user.last_name} deleted`);
		await deleteUser(user);
	};

	var setPaginationPage = (page) => {
		dispatch(setCurrentPage(page));
	};

	const handleSort = (field, type) => {
		navigateSearch('', {
			term: searchTerm,
			sort: type ? 'desc' : 'asc',
			field: field,
		});
	};

	let filterdData = usersData.filter((item) => {
		if (
			item.first_name.toLowerCase().match(searchTerm.toLowerCase()) ||
			item.last_name.toLowerCase().match(searchTerm.toLowerCase()) ||
			item.email.toLowerCase().match(searchTerm.toLowerCase())
		) {
			return item;
		}
	});

	const sorted = sort(
		filterdData,
		fieldName == null ? 'Firstname' : 'Firstname',
		sortType == 'desc' ? 1 : 0
	);
	console.log({ sorted });
	return (
		<>
			{loading ? (
				<SpinnerContainer>
					<Loader />
				</SpinnerContainer>
			) : (
				<HomeContainer>
					<Users
						users={sorted ? sorted : []}
						deleteUser={deleteUserById}
						handleSort={handleSort}
					/>

					{!searchTerm && (
						<Pagination
							totalUsers={usersData.length}
							paginate={setPaginationPage}
							pageNumber={currentPage}
							totalPages={meta.total_pages}
						/>
					)}
				</HomeContainer>
			)}
		</>
	);
};
