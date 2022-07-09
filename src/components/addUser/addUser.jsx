import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CustomButton } from '../UI/button/button';
const ariaLabel = { 'aria-label': 'description' };
import Loader from '../UI/loader/loader';
import { Toast } from '../UI/toast/toast';
import { ToastContainer } from 'react-toastify';
import { addUser } from '../../requests/userRequest';
import { SpinnerContainer } from '../UI/loader/loaderStyle';
import TextField from '@mui/material/TextField';
import { useSelector } from 'react-redux';
import { deepOrange } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import {
	UserCardContainer,
	SubmitButton,
	ActionButtonContainer,
	FormContainer,
	SmallLoader,
} from './addUserStyle';

export const AddUser = () => {
	const [loading, setLoading] = useState(false);
	const [adding, setAdding] = useState(false);
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const usersData = useSelector((state) => state.user.users);

	const handleInputChange = (event) => {
		const target = event.target.value;
		setFirstName(target);
	};

	const handleInputChangeLastName = (event) => {
		const target = event.target.value;
		setLastName(target);
	};

	const handleInputChangeEmail = (event) => {
		const target = event.target.value;
		setEmail(target);
	};
	const addUserData = async () => {
		if (firstName != '' && lastName != '' && email != '') {
			setAdding(true);
			const data = await addUser({
				first_name: firstName,
				last_name: lastName,
				email: email,
			});
			console.log(data);
			setAdding(false);
			Toast('User added Successfully');
		} else {
			Toast('Please check your input feilds');
			setAdding(false);
		}
	};

	const handleFormSubmit = (e) => {
		e.preventDefault();
		addUserData();
	};

	return loading ? (
		<SpinnerContainer>
			<Loader />
		</SpinnerContainer>
	) : (
		<>
			<ToastContainer
				position='bottom-right'
				autoClose={100}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				limit={1}
			/>
			<UserCardContainer>
				<Stack direction='row' spacing={2} alignItems='center'>
					<Avatar sx={{ bgcolor: deepOrange[500] }} variant='square'>
						N
					</Avatar>
					<h3 style={{ color: '#1976d2' }}> ADD NEW USER</h3>
				</Stack>
				<FormContainer>
					<form onSubmit={handleFormSubmit}>
						<TextField
							label='Firstname'
							color='primary'
							focused
							placeholder='Firstname'
							value={firstName}
							inputProps={ariaLabel}
							onChange={handleInputChange}
							size='small'
							required
						/>

						<br />
						<br />
						<TextField
							label='Lastname'
							color='primary'
							focused
							placeholder='Lastname'
							value={lastName}
							inputProps={ariaLabel}
							onChange={handleInputChangeLastName}
							size='small'
							required
						/>
						<br />
						<br />
						<TextField
							label='Email'
							color='primary'
							focused
							placeholder='Email'
							value={email}
							inputProps={ariaLabel}
							onChange={handleInputChangeEmail}
							size='small'
							required
						/>

						<ActionButtonContainer>
							<Link to={`/`}>
								<CustomButton
									color='primary'
									variant='contained'
									disableElevation
									size='small'
								>
									Go back
								</CustomButton>
							</Link>
							<SubmitButton
								variant='outlined'
								size='medium'
								type='submit'
								className='submit-btn'
							>
								{adding ? (
									<SmallLoader>
										<Loader size={20} /> Adding..
									</SmallLoader>
								) : (
									'ADD'
								)}
							</SubmitButton>
						</ActionButtonContainer>
					</form>
				</FormContainer>
			</UserCardContainer>
		</>
	);
};
