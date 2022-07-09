import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import Loader from '../UI/loader/loader';
import { ToastContainer } from 'react-toastify';
import { fetchAUser } from '../../requests/userRequest';
import { SpinnerContainer } from '../UI/loader/loaderStyle';
import { UserCardContainer } from './singleUserStyle';

export const SingleUser = ({ id }) => {
	const [user, setUser] = useState({});
	const [loading, setLoading] = useState(false);

	const getUser = async () => {
		setLoading(true);
		const data = await fetchAUser(id);
		setLoading(false);
		setUser(data.data.data);
		setFirstName(data.data.data.first_name);
		setLastName(data.data.data.last_name);
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
			<UserCardContainer style={{ margin: '0 20px' }}>
				<Card sx={{ maxWidth: 500 }}>
					<CardActionArea>
						<CardMedia
							component='img'
							image={user.avatar}
							alt={user.first_name}
							style={{ height: '200px', width: '100%' }}
						/>
						<CardContent>
							<p>
								{user.email} <br />
								{user.first_name} {user.last_name}
							</p>
						</CardContent>
					</CardActionArea>
				</Card>
			</UserCardContainer>
		</>
	);
};
