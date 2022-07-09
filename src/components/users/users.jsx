import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { ArrowDropUp, ArrowDropDown } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';

import { Link, useNavigate, createSearchParams, useSearchParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { ToastContainer } from 'react-toastify';
import { UserContainer, SearchBoxContainer, ActionButtonContainer } from './userStyle';
import { NoResults } from '../noResults/noResults';
import { CustomButton } from '../UI/button/button';
import { SingleUser } from '../singleUser/singleUser';
import { useDispatch, useSelector } from 'react-redux';
import { setTerm } from '../../actions/userActions';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.info.dark,
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

const useNavigateSearch = () => {
	const navigate = useNavigate();
	return (pathname, params) => navigate(`${pathname}?${createSearchParams(params)}`);
};
const Users = ({ users, deleteUser, handleSort }) => {
	const navigateSearch = useNavigateSearch();
	const [searchParams] = useSearchParams();
	const dispatch = useDispatch();
	const [open, setOpen] = useState(false);
	const [user, setUser] = useState('');
	const [userView, setUserView] = useState(false);
	const [order, setOrder] = useState(false);
	const searchTerm = useSelector((state) => state.user.term);

	let sortType = searchParams.get('sort');
	let fieldName = searchParams.get('field');

	const handleSetSearch = (e) => {
		dispatch(setTerm(e.target.value));

		if (e.target.value == '') {
			navigateSearch('');
		} else {
			navigateSearch('', {
				term: e.target.value,
				sort: sortType,
				field: fieldName,
			});
		}
	};

	const handleClickOpen = (user) => {
		setOpen(true);
		setUser(user);
	};
	const handleViewUser = (user) => {
		setUserView(true);
		setUser(user);
	};

	const handleViewClose = () => {
		setUserView(false);
	};
	const handleClose = () => {
		setOpen(false);
	};
	const handleDelete = () => {
		deleteUser(user);
		setOpen(false);
	};

	const changeArrows = (colName) => {
		setOrder(!order);
		handleSort(colName, order);
	};

	return (
		<UserContainer>
			<div>
				<Dialog
					open={open}
					onClose={handleClose}
					aria-labelledby='alert-dialog-title'
					aria-describedby='alert-dialog-description'
				>
					<p style={{ padding: '0px 20px' }}>
						{`Are you sure you want to delete ${user.first_name} ${user.last_name}?`}
					</p>

					<DialogActions>
						<Button onClick={handleClose}>Cancel</Button>
						<Button onClick={handleDelete} autoFocus>
							Delete
						</Button>
					</DialogActions>
				</Dialog>
			</div>

			<div>
				<Dialog
					open={userView}
					aria-labelledby='alert-dialog-title'
					aria-describedby='alert-dialog-description'
				>
					<SingleUser id={user.id} />

					<DialogActions>
						<Button onClick={handleViewClose}>Cancel</Button>
					</DialogActions>
				</Dialog>
			</div>
			<ToastContainer
				position='bottom-right'
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				autoClose={100}
			/>
			<SearchBoxContainer>
				<Link to={`/user/add`} style={{ textDecoration: 'none' }}>
					<CustomButton
						variant='contained'
						disableElevation
						size='small'
						color='primary'
					>
						Add user
					</CustomButton>
				</Link>
				<TextField
					color='primary'
					focused
					id='outlined-search'
					label='Search'
					placeholder='Search by firstName,lastName and email'
					type='search'
					onChange={(e) => handleSetSearch(e)}
					size='small'
					value={searchTerm}
				/>
			</SearchBoxContainer>
			<TableContainer component={Paper}>
				<Table stickyHeader aria-label='simple table'>
					<TableHead>
						<TableRow>
							<StyledTableCell>ID</StyledTableCell>
							<StyledTableCell
								align='right'
								onClick={() => changeArrows('Firstname')}
								style={{
									cursor: 'pointer',
								}}
							>
								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'flex-end',
									}}
								>
									{!order ? <ArrowDropUp /> : <ArrowDropDown />}
									Firstname
								</div>
							</StyledTableCell>
							<StyledTableCell
								align='right'
								onClick={() => changeArrows('Lastname')}
								style={{ cursor: 'pointer' }}
							>
								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'flex-end',
									}}
								>
									{!order ? <ArrowDropUp /> : <ArrowDropDown />}
									Lastname
								</div>
							</StyledTableCell>
							<StyledTableCell
								align='right'
								onClick={() => changeArrows('Email')}
								style={{ cursor: 'pointer' }}
							>
								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'flex-end',
									}}
								>
									{!order ? <ArrowDropUp /> : <ArrowDropDown />}
									Email
								</div>
							</StyledTableCell>
							<StyledTableCell align='center'>Actions</StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{users.length == 0 ? (
							<tr>
								<td colSpan='4'>
									<NoResults />
								</td>
							</tr>
						) : (
							users.map((user) => (
								<TableRow
									key={user.id}
									sx={{
										'&:last-child td, &:last-child th': {
											border: 0,
										},
									}}
								>
									<TableCell component='th' scope='row' align='right'>
										{user.id}
									</TableCell>
									<TableCell align='right'>{user.first_name}</TableCell>
									<TableCell align='right'>{user.last_name}</TableCell>
									<TableCell align='right'>{user.email}</TableCell>
									<TableCell align='center'>
										<ActionButtonContainer>
											<CustomButton
												color='info'
												variant='contained'
												disableElevation
												size='small'
												handleOnClick={() => handleViewUser(user)}
											>
												View
											</CustomButton>
											<Link to={`/user/${user.id}`}>
												<CustomButton
													variant='contained'
													disableElevation
													size='small'
													color='primary'
												>
													Edit
												</CustomButton>
											</Link>
											<CustomButton
												variant='contained'
												size='small'
												color='secondary'
												disableElevation
											>
												<a
													href={`mailto:${user.email}`}
													style={{
														textDecoration: 'none',
														color: 'white',
													}}
												>
													Email
												</a>
											</CustomButton>
											<CustomButton
												color='error'
												variant='contained'
												disableElevation
												size='small'
												handleOnClick={() =>
													handleClickOpen(user)
												}
											>
												DELETE
											</CustomButton>
										</ActionButtonContainer>
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</TableContainer>
		</UserContainer>
	);
};

export default Users;
