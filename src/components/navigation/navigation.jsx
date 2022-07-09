import './navigation.css';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Outlet } from 'react-router-dom';

export const Navigation = () => {
	return (
		<>
			<AppBar
				component='nav'
				className='custom-header'
				style={{ background: '#01579b' }}
				position='fixed'
			>
				<Toolbar>
					<IconButton
						color='inherit'
						aria-label='open drawer'
						sx={{ mr: 2, display: { sm: 'none' } }}
					>
						<MenuIcon />
					</IconButton>
					<Link to={`/`}>
						<Typography
							variant='h6'
							component='div'
							sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
						>
							User Administration System
						</Typography>
					</Link>
				</Toolbar>
			</AppBar>
			<Outlet />
		</>
	);
};
