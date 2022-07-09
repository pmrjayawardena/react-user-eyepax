import styled from 'styled-components';

export const UserCardContainer = styled.nav`
	min-height: 400px;
	height: 400px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 80%;
	margin: auto;
	margin-top: 3rem;
`;

export const FormContainer = styled.div`
	margin-top: 2rem;
`;

export const SmallLoader = styled.div`
	display: flex;
	margin-left: 10px;
	align-items: center;
	font-size: 13px;
	gap: 10px;
`;
export const ActionButtonContainer = styled.nav`
	display: flex;
	margin-top: 2rem;
	gap: 20px;
	a {
		text-decoration: none;
		color: #000;
	}
`;

export const SubmitButton = styled.button`
	border: 1px solid rgba(25, 118, 210, 0.5);
	height: 32px;
	border-radius: 4px;
	width: 100px;
	background: transparent;
	color: #1976d2;
	font-size: 14px;
	cursor: pointer;
`;
