import React from 'react';
import {Link} from 'react-router-dom';
import {Debounce} from 'react-throttle';
import BookGrid from "../BookGrid/BookGrid";
import './Search.css'

const Search  = ({books, onSearch, query}) =>
		<div className="search-books">
			<div className="search-books-bar">
				<Link className="close-search" to="/">Close</Link>
				<div className="search-books-input-wrapper">
					<Debounce time="400" handler="onChange">
						<input type="text"
						       placeholder="Search by title or author"
						       onChange={onSearch}/>
					</Debounce>
				</div>
			</div>
			<div className="search-books-results">
				{
					books.length > 0
						? <BookGrid books={books} />
						: <h3 className="book-not-found">{query !== '' ? 'Book not found' : ''}</h3>
				}
			</div>
		</div>

export default Search;