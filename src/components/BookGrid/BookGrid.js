import React from 'react';
import Book from "../Book/Book";
import './BookGrid.css';

const BookGrid = ({books}) =>
	<ol className="books-grid">
		{
			books.map((book, index) =>
				<li key={index}>
					<Book {...book}/>
				</li>)
		}
	</ol>;

export default BookGrid;