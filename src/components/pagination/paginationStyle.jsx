import styled from 'styled-components';

export const PaginateContainer = styled.nav`
	width: 80%;
	margin: auto;
	display: flex;
	margin-top: 20px;
`;

export const PageItemList = styled.li`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 40px;
	border: 1px solid #01579b;
	width: 40px;
	cursor: pointer;
	&:hover {
		background: #01579b;
		color: #fff;
	}
	&.active {
		background: #01579b;
		color: #fff;
	}
`;
