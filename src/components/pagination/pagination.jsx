import React from 'react';
import './paginationStyle.jsx';
import { PaginateContainer, PageItemList } from './paginationStyle';

export const Pagination = ({ paginate, pageNumber, totalPages }) => {
	const pageNumbers = [];
	for (let i = 1; i <= Math.ceil(totalPages); i++) {
		pageNumbers.push(i);
	}

	return (
		<PaginateContainer>
			{pageNumbers.map((number) => {
				return (
					<PageItemList
						key={number}
						className={`page-item ${pageNumber == number ? 'active' : ''}`}
						onClick={() => paginate(number)}
					>
						<span className='page-link'>{number}</span>
					</PageItemList>
				);
			})}
		</PaginateContainer>
	);
};
