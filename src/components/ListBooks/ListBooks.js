import React from 'react';
import Bookshelf from "../Bookshelf/Bookshelf";
import Header from "../Header/header";
import SearchButton from "../SearchButton/SearchButton";
import './ListBooks.css'

const bookshelves = [
	{title: "Currently Reading", value: "currentlyReading"},
	{title: "Want to read", value: "wantToRead"},
	{title: "Read", value: "read"}
]

const ListBooks = ({books}) =>
		<div className="list-books">
			<Header/>
			<div className="list-books-content">
				<div className="align-bookshelves">
					{bookshelves.map((shelf, index) =>
						<Bookshelf
							key={index}
							shelf={shelf}
							books={books.filter(book => book.shelf === shelf.value)}
						/>)
					}
				</div>
			</div>
			<SearchButton/>
		</div>

export default ListBooks;