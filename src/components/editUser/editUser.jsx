import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import { CustomButton } from '../UI/button/button';
const ariaLabel = { 'aria-label': 'description' };
import Loader from '../UI/loader/loader';
import { Toast } from '../UI/toast/toast';
import { ToastContainer } from 'react-toastify';
import { updateUser, fetchAUser } from '../../requests/userRequest';
import { SpinnerContainer } from '../UI/loader/loaderStyle';
import TextField from '@mui/material/TextField';
import {
	UserCardContainer,
	SubmitButton,
	ActionButtonContainer,
	FormContainer,
	SmallLoader,
} from './editUserStyle';

export const EditUser = () => {
	let { id } = useParams();

	const [user, setUser] = useState({});
	const [loading, setLoading] = useState(false);
	const [updating, setUpdating] = useState(false);
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');

	const getUser = async () => {
		setLoading(true);
		const data = await fetchAUser(id);
		setLoading(false);
		setUser(data.data.data);

		setFirstName(data.data.data.first_name);
		setLastName(data.data.data.last_name);
		setEmail(data.data.data.email);
	};

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
	const updateUserData = async () => {
		if (firstName != '' && lastName != '' && email != '') {
			setUpdating(true);
			const data = await updateUser(
				{
					first_name: firstName,
					last_name: lastName,
					email: email,
				},
				id
			);
			console.log('updated', data);
			setUpdating(false);

			Toast('Updated Successfully');
		} else {
			Toast('Please check your fields');
		}
	};

	const handleFormSubmit = (e) => {
		e.preventDefault();
		updateUserData();
	};

	useEffect(() => {
		getUser();
	}, [id]);

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
				<h3>UPDATE USER</h3>
				<Card sx={{ maxWidth: 345 }}>
					<CardActionArea>
						<CardMedia
							component='img'
							image={user.avatar}
							alt={user.first_name}
							style={{ height: '200px', width: '100%' }}
						/>
					</CardActionArea>
				</Card>
				<FormContainer>
					<form onSubmit={handleFormSubmit}>
						<TextField
							label='Firstname'
							color='primary'
							focused
							placeholder='firstName'
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
							placeholder='lastName'
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
								variant='contained'
								size='small'
								type='submit'
								disableElevation
								className='submit-btn'
							>
								{updating ? (
									<SmallLoader>
										<Loader size={20} /> Updating..
									</SmallLoader>
								) : (
									'UPDATE'
								)}
							</SubmitButton>
						</ActionButtonContainer>
					</form>
				</FormContainer>
			</UserCardContainer>
		</>
	);
};
