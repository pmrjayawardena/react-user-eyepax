import React from 'react';
import Button from '@mui/material/Button';

export const CustomButton = (props) => {
	const { variant, size, color, handleOnClick } = props;
	return (
		<Button
			variant={variant}
			size={size}
			color={color}
			style={{ fontSize: '11px' }}
			onClick={handleOnClick}
		>
			{props.children}
		</Button>
	);
};
